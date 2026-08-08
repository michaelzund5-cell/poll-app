/**
 * @file src/app/features/surveys/data-access/survey.repository.ts
 * @description Survey persistence repository.
 *
 * Owns all Supabase queries and mutations for surveys, questions, answers and votes. The repository is the only survey layer that knows table names and persistence field names.
 */

import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '../../../core/data-access/supabase-client.service';
import { CreateSurveyInput } from '../models/survey.model';
import { SurveyDetailsRowDto, SurveyRowDto, VoteRowDto } from '../models/survey.dto';

/**
 * Repository-specific error that preserves the original Supabase failure.
 * Components receive stable application messages while diagnostics retain root cause.
 */
export class SurveyRepositoryError extends Error {
  constructor(message: string, readonly originalError?: unknown) {
    super(message);
    this.name = 'SurveyRepositoryError';
  }
}

@Injectable({ providedIn: 'root' })
/**
 * Persistence boundary for the survey feature.
 *
 * All table names, query syntax and persistence field names stay in this class.
 * Higher layers depend on intent-oriented methods instead of Supabase directly.
 */
export class SurveyRepository {
  private readonly supabase = inject(SupabaseClientService);

  /**
   * Loads all survey rows. Mapping to domain models is intentionally left to SurveyService/mapper.
   */
  async findAll(): Promise<SurveyRowDto[]> {
    const { data, error } = await this.supabase.client.from('surveys').select('*');

    if (error) {
      throw new SurveyRepositoryError('Could not load surveys.', error);
    }

    return (data ?? []) as SurveyRowDto[];
  }

  /**
   * Loads one survey with nested questions and answers. `null` is a valid not-found result; query failures throw.
   */
  async findById(id: number): Promise<SurveyDetailsRowDto | null> {
    const { data, error } = await this.supabase.client
      .from('surveys')
      .select('*, questions(*, answers(*))')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new SurveyRepositoryError('Could not load survey.', error);
    }

    return data as SurveyDetailsRowDto | null;
  }

  /**
   * Persists a survey aggregate. If a child insert fails, the created parent survey is removed to avoid leaving a visibly incomplete aggregate.
   */
  async create(input: CreateSurveyInput): Promise<number> {
    const { data: survey, error: surveyError } = await this.supabase.client
      .from('surveys')
      .insert({
        title: input.title,
        description: input.description || null,
        category: input.category,
        end_date: input.endDate || null,
      })
      .select('id')
      .single();

    if (surveyError || !survey) {
      throw new SurveyRepositoryError('Could not create survey.', surveyError);
    }

    try {
      for (const [questionIndex, question] of input.questions.entries()) {
        const { data: savedQuestion, error: questionError } = await this.supabase.client
          .from('questions')
          .insert({
            survey_id: survey.id,
            text: question.text,
            allow_multiple: question.allowMultiple,
            position: questionIndex,
          })
          .select('id')
          .single();

        if (questionError || !savedQuestion) {
          throw new SurveyRepositoryError('Could not create survey question.', questionError);
        }

        const answers = question.answers.map((answer, answerIndex) => ({
          question_id: savedQuestion.id,
          label: String.fromCharCode(65 + answerIndex),
          text: answer.text,
          position: answerIndex,
        }));

        const { error: answerError } = await this.supabase.client.from('answers').insert(answers);
        if (answerError) {
          throw new SurveyRepositoryError('Could not create survey answers.', answerError);
        }
      }
    } catch (error) {
      await this.supabase.client.from('surveys').delete().eq('id', survey.id);
      throw error;
    }

    return survey.id;
  }

  /**
   * Persists selected answer ids in one batch. An empty selection is treated as a no-op rather than issuing an unnecessary query.
   */
  async createVotes(answerIds: readonly number[]): Promise<void> {
    if (answerIds.length === 0) {
      return;
    }

    const { error } = await this.supabase.client
      .from('votes')
      .insert(answerIds.map((answerId) => ({ answer_id: answerId })));

    if (error) {
      throw new SurveyRepositoryError('Could not save votes.', error);
    }
  }

  /**
   * Loads only vote data needed for result calculation. The projection avoids fetching unused vote columns.
   */
  async findVotes(answerIds: readonly number[]): Promise<VoteRowDto[]> {
    if (answerIds.length === 0) {
      return [];
    }

    const { data, error } = await this.supabase.client
      .from('votes')
      .select('answer_id')
      .in('answer_id', [...answerIds]);

    if (error) {
      throw new SurveyRepositoryError('Could not load survey results.', error);
    }

    return (data ?? []) as VoteRowDto[];
  }
}
