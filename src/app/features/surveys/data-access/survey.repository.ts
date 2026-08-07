import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '../../../core/data-access/supabase-client.service';
import { CreateSurveyInput } from '../models/survey.model';
import { SurveyDetailsRowDto, SurveyRowDto, VoteRowDto } from '../models/survey.dto';

export class SurveyRepositoryError extends Error {
  constructor(message: string, readonly originalError?: unknown) {
    super(message);
    this.name = 'SurveyRepositoryError';
  }
}

@Injectable({ providedIn: 'root' })
export class SurveyRepository {
  private readonly supabase = inject(SupabaseClientService);

  async findAll(): Promise<SurveyRowDto[]> {
    const { data, error } = await this.supabase.client.from('surveys').select('*');

    if (error) {
      throw new SurveyRepositoryError('Could not load surveys.', error);
    }

    return (data ?? []) as SurveyRowDto[];
  }

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
