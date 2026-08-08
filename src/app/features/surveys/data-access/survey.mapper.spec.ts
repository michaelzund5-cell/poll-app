/**
 * @file src/app/features/surveys/data-access/survey.mapper.spec.ts
 * @description Unit test specification for survey.mapper.
 *
 * Verifies the public behavior or creation contract of the corresponding unit. Tests document expected behavior and protect refactoring from regressions.
 */

import { describe, expect, it } from 'vitest';
import { mapSurvey } from './survey.mapper';

describe('survey mapper', () => {
  it('maps database fields to the domain model', () => {
    const survey = mapSurvey({
      id: 1,
      title: 'Architecture feedback',
      description: null,
      category: 'Technology & Innovation',
      end_date: '2026-08-31',
    });

    expect(survey.id).toBe(1);
    expect(survey.category).toBe('Technology & Innovation');
    expect(survey.endDate).toBeInstanceOf(Date);
    expect(survey.description).toBeUndefined();
  });
});
