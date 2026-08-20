/**
 * @file src/app/domain/polls/poll.rules.ts
 * @description Shared poll validation, deadline and sorting rules.
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const POLL_LIMITS = {
  maximumPrompts: 4,
  minimumChoices: 2,
  maximumChoices: 6,
  endingSoonDays: 7,
  maximumTitleLength: 120,
  maximumDescriptionLength: 1000,
  maximumQuestionLength: 160,
  maximumAnswerLength: 120,
} as const;

/**
 * Builds a validator that rejects blank or too-short text.
 * @param minimumCharacters Minimum non-space characters.
 * @returns Validator for meaningful text.
 */
export function meaningfulText(minimumCharacters: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    return value.length >= minimumCharacters
      ? null
      : { meaningfulText: { requiredLength: minimumCharacters } };
  };
}

/**
 * Normalizes user-entered text before persistence.
 * @param value Raw user value.
 * @returns Trimmed text with normalized whitespace.
 */
export function normalizeText(value: unknown): string {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

/**
 * Checks whether a poll deadline has already passed.
 * @param date Optional poll deadline.
 * @returns Whether the deadline is before today.
 */
export function isClosed(date?: Date): boolean {
  return Boolean(date && startOfDay(date).getTime() < startOfToday().getTime());
}

/**
 * Calculates whole calendar days until a deadline.
 * @param date Optional poll deadline.
 * @returns Whole days remaining, or null without a deadline.
 */
export function daysRemaining(date?: Date): number | null {
  if (!date) return null;
  const difference = startOfDay(date).getTime() - startOfToday().getTime();
  return Math.ceil(difference / 86_400_000);
}

/**
 * Creates a sortable timestamp for an optional deadline.
 * @param date Optional poll deadline.
 * @returns Sort timestamp with missing deadlines last.
 */
export function deadlineTimestamp(date?: Date): number {
  return date?.getTime() ?? Number.MAX_SAFE_INTEGER;
}

/**
 * Normalizes a date to midnight.
 * @param date Date to normalize.
 * @returns Copy set to the start of its day.
 */
function startOfDay(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Returns today normalized to midnight.
 * @returns Current date normalized to the start of today.
 */
function startOfToday(): Date {
  return startOfDay(new Date());
}
