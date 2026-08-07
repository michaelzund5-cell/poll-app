# PollApp Architecture

## Goal

Keep the existing UI and behavior while making the code easier to maintain, test and extend.

## Data flow

`Component -> SurveyService -> SurveyRepository -> Supabase`

Database rows are converted to domain models by `survey.mapper.ts`. Components therefore do not depend on Supabase column names such as `end_date` or `allow_multiple`.

## Responsibilities

- `core/data-access`: infrastructure clients only.
- `features/surveys/data-access`: persistence and DTO/domain mapping.
- `features/surveys/services`: survey business use-cases.
- `features/surveys/models`: domain and create-input models.
- `features/surveys/constants`: typed categories and limits.
- `features/surveys/utils`: pure reusable calculations.
- `components`: UI state, user interaction and presentation only.

## Quality rules used

- Strict TypeScript and strict Angular templates.
- No `any` in application code.
- No manual `ChangeDetectorRef.detectChanges()`.
- Signals/computed values for component state.
- Database access is isolated in the repository.
- DTOs and domain models are separate.
- Errors are surfaced instead of silently ignored.
- Repeated date calculations and limits are centralized.
- Pure utilities and mappers have unit tests.
