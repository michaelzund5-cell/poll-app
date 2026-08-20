/**
 * @file src/app/infrastructure/polls/supabase-poll.store.ts
 * @description Supabase persistence adapter for polls.
 */

import { inject, Injectable } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { PollDraft, PollDraftPrompt } from '../../domain/polls/poll.contracts';
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

  /**
   * Loads survey rows required by the overview.
   * @returns Survey rows required by the overview.
   */
  async list(): Promise<SurveyRow[]> {
    const { data, error } = await this.database
      .from('surveys')
      .select('id,title,category,description,end_date');
    if (error) throw new Error(`Survey list query failed: ${error.message}`);
    return (data ?? []) as SurveyRow[];
  }

  /**
   * Loads one survey with its questions and answers.
   * @param id Survey id.
   * @returns Survey with questions and answers, or null.
   */
  async get(id: number): Promise<SurveyDetailRow | null> {
    const { data, error } = await this.database
      .from('surveys')
      .select('id,title,category,description,end_date,questions(id,text,allow_multiple,position,answers(id,label,text,position))')
      .eq('id', id)
      .maybeSingle();
    if (error) throw new Error(`Survey detail query failed: ${error.message}`);
    return data as SurveyDetailRow | null;
  }

  /**
   * Creates a survey through the persistence adapter.
   * @param draft Valid survey draft.
   * @returns Id of the created survey.
   */
  async create(draft: PollDraft): Promise<number> {
    const surveyId = await this.createSurvey(draft);
    try {
      await this.createQuestions(surveyId, draft.prompts);
      return surveyId;
    } catch (error) {
      await this.rollbackSurvey(surveyId);
      throw error;
    }
  }

  /**
   * Stores a submitted set of answer ids.
   * @param answerIds Selected answer ids.
   * @returns Promise completed after insertion.
   */
  async recordVotes(answerIds: number[]): Promise<void> {
    const rows = answerIds.map((answerId) => ({ answer_id: answerId }));
    const { error } = await this.database.from('votes').insert(rows);
    if (error) throw new Error(`Vote creation failed: ${error.message}`);
  }

  /**
   * Loads persisted votes for specific answer ids.
   * @param answerIds Answer ids to query.
   * @returns Persisted votes for those answers.
   */
  async votesFor(answerIds: number[]): Promise<VoteRow[]> {
    if (answerIds.length === 0) return [];
    const { data, error } = await this.database
      .from('votes')
      .select('answer_id')
      .in('answer_id', answerIds);
    if (error) throw new Error(`Vote query failed: ${error.message}`);
    return (data ?? []) as VoteRow[];
  }

  /**
   * Subscribes to realtime vote inserts.
   * @param onVoteInserted Callback for vote inserts.
   * @returns Realtime cleanup callback.
   */
  watchVotes(onVoteInserted: () => void): () => void {
    const channel = this.createVoteChannel(onVoteInserted);
    return () => { void this.database.removeChannel(channel); };
  }

  /**
   * Creates the parent survey row.
   * @param draft Survey draft.
   * @returns Id of the inserted survey row.
   */
  private async createSurvey(draft: PollDraft): Promise<number> {
    const { data, error } = await this.database.from('surveys').insert({
      title: draft.title,
      category: draft.category,
      description: draft.description ?? null,
      end_date: draft.closesAt ?? null,
    }).select('id').single();
    if (error || !data) throw new Error(`Survey creation failed: ${error?.message ?? 'Missing id'}`);
    return data.id as number;
  }

  /**
   * Creates all question rows for a survey.
   * @param surveyId Parent survey id.
   * @param prompts Prompt drafts to insert.
   */
  private async createQuestions(surveyId: number, prompts: PollDraftPrompt[]): Promise<void> {
    for (const [index, prompt] of prompts.entries()) {
      const questionId = await this.createQuestion(surveyId, prompt, index);
      await this.createAnswers(questionId, prompt);
    }
  }

  /**
   * Creates one question row.
   * @param surveyId Parent survey id.
   * @param prompt Prompt draft.
   * @param position Display position.
   * @returns Question id.
   */
  private async createQuestion(surveyId: number, prompt: PollDraftPrompt, position: number): Promise<number> {
    const { data, error } = await this.database.from('questions').insert({
      survey_id: surveyId,
      text: prompt.text,
      allow_multiple: prompt.multiple,
      position,
    }).select('id').single();
    if (error || !data) throw new Error(error?.message ?? 'Question id missing');
    return data.id as number;
  }

  /**
   * Creates all answer rows for one question.
   * @param questionId Parent question id.
   * @param prompt Prompt containing answer choices.
   */
  private async createAnswers(questionId: number, prompt: PollDraftPrompt): Promise<void> {
    const rows = prompt.choices.map((choice, index) => ({
      question_id: questionId,
      label: String.fromCharCode(65 + index),
      text: choice.text,
      position: index,
    }));
    const { error } = await this.database.from('answers').insert(rows);
    if (error) throw new Error(error.message);
  }

  /**
   * Removes a partially created survey after a child insert fails.
   * @param surveyId Survey id to remove after a failed child insert.
   */
  private async rollbackSurvey(surveyId: number): Promise<void> {
    const { error } = await this.database.from('surveys').delete().eq('id', surveyId);
    if (error) console.warn('Survey rollback failed', error);
  }

  /**
   * Creates and subscribes the realtime vote channel.
   * @param onVoteInserted Callback for vote inserts.
   * @returns Subscribed realtime channel.
   */
  private createVoteChannel(onVoteInserted: () => void): RealtimeChannel {
    return this.database
      .channel(`poll-votes-${crypto.randomUUID()}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, onVoteInserted)
      .subscribe();
  }
}
