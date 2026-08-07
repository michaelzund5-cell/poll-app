const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function getDaysUntil(endDate: Date, now = Date.now()): number {
  return Math.ceil((endDate.getTime() - now) / MILLISECONDS_PER_DAY);
}

export function isSurveyPast(endDate?: Date, now = Date.now()): boolean {
  return endDate ? getDaysUntil(endDate, now) < 0 : false;
}

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
