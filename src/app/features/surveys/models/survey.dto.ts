/**
 * @file src/app/features/surveys/models/survey.dto.ts
 * @description Persistence DTO contracts for Supabase rows.
 *
 * Mirrors database-oriented field names and shapes. DTOs deliberately stay separate from domain models so database schema details do not leak into components.
 */

/** Raw survey row returned by Supabase. Field names intentionally mirror the database schema. */
export interface SurveyRowDto {
  id: number;
  title: string;
  description: string | null;
  category: string;
  end_date: string | null;
}

/** Raw answer row returned by Supabase, including ordering and parent foreign-key information. */
export interface AnswerRowDto {
  id: number;
  question_id: number;
  label: string;
  text: string;
  position: number;
}

/** Raw question row including nested answers when fetched through the detail query. */
export interface QuestionRowDto {
  id: number;
  survey_id: number;
  text: string;
  hint: string | null;
  allow_multiple: boolean;
  position: number;
  answers: AnswerRowDto[];
}

/** Expanded survey DTO used by detail queries that include nested questions and answers. */
export interface SurveyDetailsRowDto extends SurveyRowDto {
  questions: QuestionRowDto[];
}

/** Minimal vote projection used for result aggregation; only the referenced answer id is required. */
export interface VoteRowDto {
  answer_id: number;
}
