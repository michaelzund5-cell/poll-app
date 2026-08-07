import { describe, expect, it } from 'vitest';
import { getDeadlineText, getDaysUntil, isSurveyPast } from './survey-date.util';

describe('survey date utilities', () => {
  const now = new Date('2026-08-07T12:00:00Z').getTime();

  it('calculates remaining days consistently', () => {
    expect(getDaysUntil(new Date('2026-08-08T12:00:00Z'), now)).toBe(1);
  });

  it('detects past surveys', () => {
    expect(isSurveyPast(new Date('2026-08-06T12:00:00Z'), now)).toBe(true);
  });

  it('formats missing deadlines', () => {
    expect(getDeadlineText(undefined, now)).toBe('No deadline');
  });
});
