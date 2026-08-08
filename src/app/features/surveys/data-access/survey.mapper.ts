/**
 * @file src/app/features/surveys/data-access/survey.mapper.ts
 * @description Boundary mapper between persistence DTOs and domain models.
 *
 * Normalizes database values, converts snake_case fields and dates, sorts ordered child records and creates safe UI defaults. This keeps persistence concerns out of components and services.
 */

import { SURVEY_CATEGORIES, SurveyCategory } from '../constants/survey.constants';
import { Answer, Question, Survey, SurveyDetails } from '../models/survey.model';
import {
  AnswerRowDto,
  QuestionRowDto,
  SurveyDetailsRowDto,
  SurveyRowDto,
} from '../models/survey.dto';

/**
 * Safe fallback for legacy/invalid persisted category values.
 *
 * One malformed historical row should not make the complete survey list unusable.
 * New writes are still restricted by SurveyCategory at the application boundary.
 */
const DEFAULT_SURVEY_CATEGORY: SurveyCategory = 'Lifestyle & Preferences';

/**
 * Converts an untrusted persistence value into a valid SurveyCategory.
 * Whitespace is normalized and unsupported values degrade to a documented fallback.
 */
function toSurveyCategory(value: string | null | undefined): SurveyCategory {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return DEFAULT_SURVEY_CATEGORY;
  }

  const category = SURVEY_CATEGORIES.find(
    (surveyCategory) => surveyCategory === normalizedValue
  );

  if (category) {
    return category;
  }

  console.warn(`Unsupported survey category: "${normalizedValue}"`);

  return DEFAULT_SURVEY_CATEGORY;
}

/** Maps a survey database row to the list/domain representation used by Angular. */
export function mapSurvey(dto: SurveyRowDto): Survey {
  return {
    id: dto.id,
    title: dto.title,
    category: toSurveyCategory(dto.category),
    description: dto.description ?? undefined,
    endDate: dto.end_date ? new Date(dto.end_date) : undefined,
  };
}

/** Creates an answer domain object with deterministic initial UI state. */
function mapAnswer(dto: AnswerRowDto): Answer {
  return {
    id: dto.id,
    label: dto.label,
    text: dto.text,
    selected: false,
    votePercentage: 0,
  };
}

/**
 * Maps a question and sorts answers by persisted position before exposing them to UI.
 * Sorting at the boundary prevents every consumer from repeating ordering logic.
 */
function mapQuestion(dto: QuestionRowDto): Question {
  return {
    id: dto.id,
    legend: dto.text,
    hint: dto.hint ?? undefined,
    allowMultiple: dto.allow_multiple,
    answers: [...dto.answers]
      .sort((a, b) => a.position - b.position)
      .map(mapAnswer),
    totalVotes: 0,
  };
}

/** Maps an expanded persistence DTO into the complete detail-page domain model. */
export function mapSurveyDetails(
  dto: SurveyDetailsRowDto
): SurveyDetails {
  return {
    ...mapSurvey(dto),
    questions: [...dto.questions]
      .sort((a, b) => a.position - b.position)
      .map(mapQuestion),
  };
}