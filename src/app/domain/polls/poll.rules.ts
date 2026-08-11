/**
 * @file src/app/domain/polls/poll.rules.ts
 * @description Poll domain rules.
 *
 * Contains reusable validation, normalization and deadline calculations so business rules do not have to be duplicated in page components.
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Central creation limits shared by the form and domain workflow. */
export const POLL_LIMITS = {
  maximumPrompts: 4,
  minimumChoices: 2,
  maximumChoices: 6,
} as const;

/**
 * Rejects blank and whitespace-only form input.
 * Trimming before measuring prevents strings such as "     " from being valid.
 */
export function meaningfulText(minimumCharacters: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const normalized = String(control.value ?? '').trim();
    return normalized.length >= minimumCharacters
      ? null
      : { meaningfulText: { requiredLength: minimumCharacters } };
  };
}

/**
 * Normalizes user text before persistence by trimming and collapsing
 * repeated whitespace.
 */
export function normalizeText(value: unknown): string {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

/** Returns whether a poll deadline is before the current local day. */
export function isClosed(date?: Date): boolean {
  return Boolean(date && date.getTime() < startOfToday().getTime());
}

/**
 * Calculates whole calendar days until a deadline.
 * `null` means the poll has no configured deadline.
 */
export function daysRemaining(date?: Date): number | null {
  if (!date) return null;
  const difference = startOfDay(date).getTime() - startOfToday().getTime();
  return Math.ceil(difference / 86_400_000);
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function startOfToday(): Date {
  return startOfDay(new Date());
}
