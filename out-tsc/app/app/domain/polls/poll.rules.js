/**
 * @file src/app/domain/polls/poll.rules.ts
 * @description Shared poll validation, deadline and sorting rules.
 */
export const POLL_LIMITS = {
    maximumPrompts: 4,
    minimumChoices: 2,
    maximumChoices: 6,
    endingSoonDays: 7,
};
/** Rejects empty and whitespace-only text. */
export function meaningfulText(minimumCharacters) {
    return (control) => {
        const value = String(control.value ?? '').trim();
        return value.length >= minimumCharacters
            ? null
            : { meaningfulText: { requiredLength: minimumCharacters } };
    };
}
/** Normalizes user text before persistence. */
export function normalizeText(value) {
    return String(value ?? '').trim().replace(/\s+/g, ' ');
}
/** Returns true when a poll deadline is before today. */
export function isClosed(date) {
    return Boolean(date && startOfDay(date).getTime() < startOfToday().getTime());
}
/** Returns whole calendar days remaining, or null when no deadline exists. */
export function daysRemaining(date) {
    if (!date) {
        return null;
    }
    const difference = startOfDay(date).getTime() - startOfToday().getTime();
    return Math.ceil(difference / 86_400_000);
}
/** Sorting helper: surveys without deadlines are placed last. */
export function deadlineTimestamp(date) {
    return date?.getTime() ?? Number.MAX_SAFE_INTEGER;
}
function startOfDay(date) {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
}
function startOfToday() {
    return startOfDay(new Date());
}
//# sourceMappingURL=poll.rules.js.map