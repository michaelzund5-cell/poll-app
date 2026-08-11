/**
 * @file src/app/infrastructure/polls/supabase-poll.store.ts
 * @description Supabase poll store.
 *
 * Owns database-specific reads and writes for surveys, questions, answers and votes. No rendering logic belongs in this layer.
 */

import { inject, Injectable } from '@angular/core';
import { PollDraft } from '../../domain/polls/poll.contracts';
import { SupabaseConnector } from '../supabase/supabase.connector';

interface SurveyRow { id: number; title: string; category: string; description: string | null; end_date: string | null; }
interface AnswerRow { id: number; label: string; text: string; position: number; }
interface QuestionRow { id: number; text: string; allow_multiple: boolean; position: number; answers: AnswerRow[]; }
interface SurveyDetailRow extends SurveyRow { questions: QuestionRow[]; }
interface VoteRow { answer_id: number; }

@Injectable({ providedIn: 'root' })
/**
 * Supabase persistence adapter for the poll feature.
 *
 * This is the only poll-specific layer that knows table names and database
 * column names. Rendering and application orchestration stay outside this file.
 */
export class SupabasePollStore {
  private readonly database = inject(SupabaseConnector).client;

  /** Reads the lightweight survey columns required by overview rendering. */
  async list(): Promise<SurveyRow[]> {
    const { data, error } = await this.database.from('surveys').select('id,title,category,description,end_date');
    if (error) throw new Error(`Poll list query failed: ${error.message}`);
    return (data ?? []) as SurveyRow[];
  }

  /** Loads one survey with its nested questions and answers. */
  async get(id: number): Promise<SurveyDetailRow | null> {
    const { data, error } = await this.database
      .from('surveys')
      .select('id,title,category,description,end_date,questions(id,text,allow_multiple,position,answers(id,label,text,position))')
      .eq('id', id)
      .maybeSingle();
    if (error) throw new Error(`Poll detail query failed: ${error.message}`);
    return data as SurveyDetailRow | null;
  }

  /**
   * Persists the complete poll hierarchy.
   *
   * The parent survey is created first because child records need its id.
   * If a child insert fails, the new survey is removed to avoid partial data.
   */
  async create(draft: PollDraft): Promise<number> {
    const { data: survey, error } = await this.database
      .from('surveys')
      .insert({
        title: draft.title,
        category: draft.category,
        description: draft.description || null,
        end_date: draft.closesAt || null,
      })
      .select('id')
      .single();
    if (error || !survey) throw new Error(`Poll creation failed: ${error?.message ?? 'No id returned'}`);

    try {
      for (let promptIndex = 0; promptIndex < draft.prompts.length; promptIndex++) {
        const prompt = draft.prompts[promptIndex];
        const { data: question, error: questionError } = await this.database
          .from('questions')
          .insert({
            survey_id: survey.id,
            text: prompt.text,
            allow_multiple: prompt.multiple,
            position: promptIndex,
          })
          .select('id')
          .single();
        if (questionError || !question) throw new Error(questionError?.message ?? 'Question id missing');

        const answerRows = prompt.choices.map((choice, choiceIndex) => ({
          question_id: question.id,
          label: String.fromCharCode(65 + choiceIndex),
          text: choice.text,
          position: choiceIndex,
        }));
        const { error: choiceError } = await this.database.from('answers').insert(answerRows);
        if (choiceError) throw new Error(choiceError.message);
      }
    } catch (childError) {
      await this.database.from('surveys').delete().eq('id', survey.id);
      throw childError;
    }

    return survey.id as number;
  }

  /** Inserts one vote row for every selected answer id. */
  async recordVotes(answerIds: number[]): Promise<void> {
    const { error } = await this.database.from('votes').insert(answerIds.map((answerId) => ({ answer_id: answerId })));
    if (error) throw new Error(`Vote creation failed: ${error.message}`);
  }

  /** Returns vote rows belonging to the supplied answer ids. */
  async votesFor(answerIds: number[]): Promise<VoteRow[]> {
    if (answerIds.length === 0) return [];
    const { data, error } = await this.database.from('votes').select('answer_id').in('answer_id', answerIds);
    if (error) throw new Error(`Vote query failed: ${error.message}`);
    return (data ?? []) as VoteRow[];
  }
}
