/**
 * @file src/app/features/surveys/models/survey.model.ts
 * @description Survey domain models and command inputs.
 *
 * Defines the structures the Angular application works with after persistence data has been mapped. These models express UI/business meaning rather than database naming conventions.
 */

import { SurveyCategory } from '../constants/survey.constants';

/** Domain representation of an answer option as consumed by the UI. Selection/result fields are UI-facing state, not database columns. */
export interface Answer {
  readonly id: number;
  readonly label: string;
  readonly text: string;
  readonly selected: boolean;
  readonly votePercentage: number;
}

/** Domain representation of a survey question with ordered answer options and derived vote totals. */
export interface Question {
  readonly id: number;
  readonly legend: string;
  readonly hint?: string;
  readonly allowMultiple: boolean;
  readonly answers: readonly Answer[];
  readonly totalVotes: number;
}

/** Compact survey model used by list views. Dates are real Date objects rather than database strings. */
export interface Survey {
  readonly id: number;
  readonly category: SurveyCategory;
  readonly title: string;
  readonly endDate?: Date;
  readonly description?: string;
}

/** Full survey model used by the detail page, extending the list model with questions. */
export interface SurveyDetails extends Survey {
  readonly questions: readonly Question[];
}

/** Write model for a new answer. Only data required by the create use case is exposed. */
export interface CreateAnswerInput {
  readonly text: string;
}

/** Write model for a new question and its answer collection. */
export interface CreateQuestionInput {
  readonly text: string;
  readonly allowMultiple: boolean;
  readonly answers: readonly CreateAnswerInput[];
}

/** Application command passed from the creation form to SurveyService/Repository. */
export interface CreateSurveyInput {
  readonly title: string;
  readonly description?: string;
  readonly category: SurveyCategory;
  readonly endDate?: string;
  readonly questions: readonly CreateQuestionInput[];
}
