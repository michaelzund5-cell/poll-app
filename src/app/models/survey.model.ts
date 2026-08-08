/**
 * @file src/app/models/survey.model.ts
 * @description Compatibility re-export for survey domain models.
 *
 * Keeps older import paths working while the canonical models live inside the survey feature. New feature code should prefer the feature-local model path.
 */

// Compatibility barrel: prefer importing directly from features/surveys/models in new code.
export * from '../features/surveys/models/survey.model';
