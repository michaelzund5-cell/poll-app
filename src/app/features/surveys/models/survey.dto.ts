export interface SurveyRowDto {
  id: number;
  title: string;
  description: string | null;
  category: string;
  end_date: string | null;
}

export interface AnswerRowDto {
  id: number;
  question_id: number;
  label: string;
  text: string;
  position: number;
}

export interface QuestionRowDto {
  id: number;
  survey_id: number;
  text: string;
  hint: string | null;
  allow_multiple: boolean;
  position: number;
  answers: AnswerRowDto[];
}

export interface SurveyDetailsRowDto extends SurveyRowDto {
  questions: QuestionRowDto[];
}

export interface VoteRowDto {
  answer_id: number;
}
