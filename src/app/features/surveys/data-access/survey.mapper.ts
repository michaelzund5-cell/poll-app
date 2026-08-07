import { SURVEY_CATEGORIES, SurveyCategory } from '../constants/survey.constants';
import { Answer, Question, Survey, SurveyDetails } from '../models/survey.model';
import {
  AnswerRowDto,
  QuestionRowDto,
  SurveyDetailsRowDto,
  SurveyRowDto,
} from '../models/survey.dto';

const DEFAULT_SURVEY_CATEGORY: SurveyCategory = 'Lifestyle & Preferences';

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

export function mapSurvey(dto: SurveyRowDto): Survey {
  return {
    id: dto.id,
    title: dto.title,
    category: toSurveyCategory(dto.category),
    description: dto.description ?? undefined,
    endDate: dto.end_date ? new Date(dto.end_date) : undefined,
  };
}

function mapAnswer(dto: AnswerRowDto): Answer {
  return {
    id: dto.id,
    label: dto.label,
    text: dto.text,
    selected: false,
    votePercentage: 0,
  };
}

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