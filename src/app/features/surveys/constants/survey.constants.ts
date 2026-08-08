/**
 * @file src/app/features/surveys/constants/survey.constants.ts
 * @description Survey domain constants and literal types.
 *
 * Defines the valid category vocabulary and survey limits once. The readonly tuple also derives the SurveyCategory union so runtime values and TypeScript types cannot silently drift apart.
 */

/**
 * Canonical list of categories accepted by the survey domain.
 * `as const` preserves literal values so the TypeScript union is derived from the
 * exact runtime list rather than maintained separately.
 */
export const SURVEY_CATEGORIES = [
  'Team Activities',
  'Health & Wellness',
  'Gaming & Entertainment',
  'Education & Learning',
  'Lifestyle & Preferences',
  'Technology & Innovation',
] as const;

/** Union of all valid survey category literals. */
export type SurveyCategory = (typeof SURVEY_CATEGORIES)[number];

/**
 * Central survey-builder constraints.
 *
 * Keeping limits here prevents UI logic from spreading hard-coded numbers across
 * templates/components and guarantees the same rules are reused everywhere.
 */
export const SURVEY_LIMITS = {
  maxQuestions: 4,
  minAnswersPerQuestion: 2,
  maxAnswersPerQuestion: 6,
} as const;
