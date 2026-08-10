import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const POLL_LIMITS = {
  maximumPrompts: 4,
  minimumChoices: 2,
  maximumChoices: 6,
} as const;

export function meaningfulText(minimumCharacters: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const normalized = String(control.value ?? '').trim();
    return normalized.length >= minimumCharacters
      ? null
      : { meaningfulText: { requiredLength: minimumCharacters } };
  };
}

export function normalizeText(value: unknown): string {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

export function isClosed(date?: Date): boolean {
  return Boolean(date && date.getTime() < startOfToday().getTime());
}

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
