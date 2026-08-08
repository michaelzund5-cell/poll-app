# PollApp Code Documentation Guide

This document complements the inline JSDoc/comments in `src/`. The goal is to explain
**responsibilities and architectural decisions**, not to narrate obvious syntax.

## Reading order

1. `src/main.ts` and `src/app/app.config.ts` — application bootstrap/infrastructure.
2. `src/app/app.routes.ts` — page-level navigation.
3. `src/app/core/data-access/supabase-client.service.ts` — external client boundary.
4. `src/app/features/surveys/models/` — persistence DTOs vs. application domain models.
5. `src/app/features/surveys/data-access/survey.mapper.ts` — persistence-to-domain boundary.
6. `src/app/features/surveys/data-access/survey.repository.ts` — Supabase persistence operations.
7. `src/app/features/surveys/services/survey.service.ts` — survey use cases/result aggregation.
8. `src/app/components/` — UI state, user interaction and presentation.

## Commenting standard used in this project

- **File headers** describe the responsibility of each source/template/style file.
- **JSDoc on classes/functions** explains contracts, side effects and architectural intent.
- **Inline comments** are used only for non-obvious decisions (for example rollback behavior,
  aggregation complexity, DOM API usage or responsive overrides).
- Obvious statements are intentionally not commented. Comments such as `// increment index`
  add maintenance noise and become stale quickly.

## Layer responsibilities

```text
Component / Template
        ↓
SurveyService
        ↓
SurveyRepository
        ↓
SupabaseClientService
        ↓
Supabase
```

DTO mapping sits at the persistence boundary:

```text
Supabase row (DTO) → Survey mapper → Domain model → Component
```

This separation keeps components independent from table names, snake_case database fields and
query syntax. It also makes domain logic and pure utilities independently testable.

## Important maintenance rule

When behavior changes, update the nearest contract comment only if the **reason or responsibility**
changed. Do not add comments merely to restate new implementation syntax.
