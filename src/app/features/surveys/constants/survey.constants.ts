export const SURVEY_CATEGORIES = [
  'Team Activities',
  'Health & Wellness',
  'Gaming & Entertainment',
  'Education & Learning',
  'Lifestyle & Preferences',
  'Technology & Innovation',
] as const;

export type SurveyCategory = (typeof SURVEY_CATEGORIES)[number];

export const SURVEY_LIMITS = {
  maxQuestions: 4,
  minAnswersPerQuestion: 2,
  maxAnswersPerQuestion: 6,
} as const;
