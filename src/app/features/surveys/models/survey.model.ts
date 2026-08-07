import { SurveyCategory } from '../constants/survey.constants';

export interface Answer {
  readonly id: number;
  readonly label: string;
  readonly text: string;
  readonly selected: boolean;
  readonly votePercentage: number;
}

export interface Question {
  readonly id: number;
  readonly legend: string;
  readonly hint?: string;
  readonly allowMultiple: boolean;
  readonly answers: readonly Answer[];
  readonly totalVotes: number;
}

export interface Survey {
  readonly id: number;
  readonly category: SurveyCategory;
  readonly title: string;
  readonly endDate?: Date;
  readonly description?: string;
}

export interface SurveyDetails extends Survey {
  readonly questions: readonly Question[];
}

export interface CreateAnswerInput {
  readonly text: string;
}

export interface CreateQuestionInput {
  readonly text: string;
  readonly allowMultiple: boolean;
  readonly answers: readonly CreateAnswerInput[];
}

export interface CreateSurveyInput {
  readonly title: string;
  readonly description?: string;
  readonly category: SurveyCategory;
  readonly endDate?: string;
  readonly questions: readonly CreateQuestionInput[];
}
