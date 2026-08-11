/**
 * @file src/app/infrastructure/polls/supabase-poll.store.ts
 * @description Supabase persistence adapter for polls.
 *
 * Only this layer knows the database schema. Pages and domain code never build
 * Supabase queries directly.
 */

import { inject, Injectable } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { PollDraft } from '../../domain/polls/poll.contracts';
import { SupabaseConnector } from '../supabase/supabase.connector';

export interface SurveyRow {
  id: number;
  title: string;
  category: string;
  description: string | null;
  end_date: string | null;
}

export interface AnswerRow {
  id: number;
  label: string;
  text: string;
  position: number;
}

export interface QuestionRow {
  id: number;
  text: string;
  allow_multiple: boolean;
  position: number;
  answers: AnswerRow[];
}

export interface SurveyDetailRow extends SurveyRow {
  questions: QuestionRow[];
}

export interface VoteRow {
  answer_id: number;
}

@Injectable({ providedIn: 'root' })
export class SupabasePollStore {
  private readonly database = inject(SupabaseConnector).client;

  /** Loads the lightweight survey fields required by the home page. */
  async list(): Promise<SurveyRow[]> {
    const { data, error } = await this.database
      .from('surveys')
      .select('id,title,category,description,end_date');

    if (error) {
      throw new Error(`Survey list query failed: ${error.message}`);
    }

    return (data ?? []) as SurveyRow[];
  }

  /** Loads one survey including ordered questions and answer options. */
  async get(id: number): Promise<SurveyDetailRow | null> {
    const { data, error } = await this.database
      .from('surveys')
      .select(
        'id,title,category,description,end_date,questions(id,text,allow_multiple,position,answers(id,label,text,position))',
      )
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Survey detail query failed: ${error.message}`);
    }

    return data as SurveyDetailRow | null;
  }

  /**
   * Creates a complete survey hierarchy.
   *
   * Parent records are created before their children. If a child insert fails,
   * the newly-created parent survey is removed to avoid partial test data.
   */
  async create(draft: PollDraft): Promise<number> {
    const { data: survey, error } = await this.database
      .from('surveys')
      .insert({
        title: draft.title,
        category: draft.category,
        description: draft.description ?? null,
        end_date: draft.closesAt ?? null,
      })
      .select('id')
      .single();

    if (error || !survey) {
      throw new Error(`Survey creation failed: ${error?.message ?? 'Missing id'}`);
    }

    try {
      for (const [questionIndex, prompt] of draft.prompts.entries()) {
        const { data: question, error: questionError } = await this.database
          .from('questions')
          .insert({
            survey_id: survey.id,
            text: prompt.text,
            allow_multiple: prompt.multiple,
            position: questionIndex,
          })
          .select('id')
          .single();

        if (questionError || !question) {
          throw new Error(questionError?.message ?? 'Question id missing');
        }

        const answerRows = prompt.choices.map((choice, answerIndex) => ({
          question_id: question.id,
          label: String.fromCharCode(65 + answerIndex),
          text: choice.text,
          position: answerIndex,
        }));

        const { error: answerError } = await this.database
          .from('answers')
          .insert(answerRows);

        if (answerError) {
          throw new Error(answerError.message);
        }
      }
    } catch (childError) {
      await this.database.from('surveys').delete().eq('id', survey.id);
      throw childError;
    }

    return survey.id as number;
  }

  /** Stores the selected answer ids for one submitted response. */
  async recordVotes(answerIds: number[]): Promise<void> {
    const rows = answerIds.map((answerId) => ({ answer_id: answerId }));
    const { error } = await this.database.from('votes').insert(rows);

    if (error) {
      throw new Error(`Vote creation failed: ${error.message}`);
    }
  }

  /** Loads persisted votes for the supplied answer ids. */
  async votesFor(answerIds: number[]): Promise<VoteRow[]> {
    if (answerIds.length === 0) {
      return [];
    }

    const { data, error } = await this.database
      .from('votes')
      .select('answer_id')
      .in('answer_id', answerIds);

    if (error) {
      throw new Error(`Vote query failed: ${error.message}`);
    }

    return (data ?? []) as VoteRow[];
  }

  /**
   * Subscribes to vote inserts so detail pages can refresh live result data.
   * Returns a cleanup callback for the page lifecycle.
   */
  watchVotes(onVoteInserted: () => void): () => void {
    const channel: RealtimeChannel = this.database
      .channel(`poll-votes-${crypto.randomUUID()}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'votes' },
        () => onVoteInserted(),
      )
      .subscribe();

    return () => {
      void this.database.removeChannel(channel);
    };
  }
}
