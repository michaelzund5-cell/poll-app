# Poll App

Poll App is an Angular survey application backed by Supabase. The project uses
clear responsibility boundaries so UI rendering, application logic, domain
rules and database access remain independent.

## Run locally

```bash
npm install
npm start
```

## Production build

```bash
npm run build
```

## Architecture

```text
src/app/
├── domain/
│   └── polls/                  # Contracts + reusable business rules
├── application/
│   └── polls/                  # Use cases + persistence/domain mapping
├── infrastructure/
│   ├── polls/                  # Supabase queries/writes/realtime
│   └── supabase/               # Supabase client construction
├── presentation/
│   └── create-poll-dialog/     # New Survey modal
└── pages/
    ├── overview/               # Ending soon + tabs + filtering
    ├── poll-detail/            # Voting + live results
    └── not-found/              # Route fallback
```

## Implemented checklist behavior

- Ending-soon surveys appear above the main list and are sorted by deadline.
- Open and Past surveys are separated.
- Each status tab keeps its own category filter and supports All.
- New Survey opens as a modal/overlay; there is no `/new` route.
- Required fields are marked and whitespace-only input is rejected.
- Optional description/deadline fields are clearly marked.
- Past surveys stay viewable but all voting controls are disabled.
- Desktop detail view uses voting on the left and results on the right.
- Selecting an answer immediately previews the live result.
- Submitted votes are persisted and refreshed from Supabase.
- Supabase Realtime triggers result refreshes when votes are inserted.
- Layouts are responsive for desktop, tablet and phone.

See `CODE_DOCUMENTATION.md` for more detail.
