/**
 * @file src/app/features/surveys/utils/survey-date.util.ts
 * @description Pure survey date utilities.
 *
 * Centralizes deadline calculations so components do not duplicate millisecond arithmetic or formatting rules. Pure functions are deterministic and straightforward to unit test.
 */

/** Milliseconds in one 24-hour day; named to avoid repeated timing arithmetic. */
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Calculates whole remaining calendar-like 24-hour units using ceil so a partial remaining day is displayed as one day.
 */
export function getDaysUntil(endDate: Date, now = Date.now()): number {
  return Math.ceil((endDate.getTime() - now) / MILLISECONDS_PER_DAY);
}

/**
 * Reports whether a deadline has passed. Surveys without a deadline stay active by definition.
 */
export function isSurveyPast(endDate?: Date, now = Date.now()): boolean {
  return endDate ? getDaysUntil(endDate, now) < 0 : false;
}

/**
 * Converts deadline state into the short user-facing text used by survey cards.
 */
export function getDeadlineText(endDate?: Date, now = Date.now()): string {
  if (!endDate) {
    return 'No deadline';
  }

  const days = getDaysUntil(endDate, now);

  if (days < 0) {
    return 'Ended';
  }
  if (days === 0) {
    return 'Ends today';
  }

  return days === 1 ? 'Ends in 1 Day' : `Ends in ${days} Days`;
}
