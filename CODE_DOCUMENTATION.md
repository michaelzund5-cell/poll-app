# Code Documentation

This file explains the source structure, responsibility boundaries and rendering/data flow of Poll Workbench.

## Core design rule

The project deliberately separates **rendering**, **application use cases**, **domain rules** and **database access**.

```text
User / Browser
      ↓
Pages
(rendering + interaction)
      ↓
PollFacade
(application use cases + mapping)
      ↓
SupabasePollStore
(database operations)
      ↓
SupabaseConnector
      ↓
Supabase
```

The domain layer provides the shared models and rules used by those layers.

## Bootstrap and application shell

### `src/main.ts`
Starts the standalone Angular application. No poll logic belongs here.

### `src/app/app.config.ts`
Registers application-wide Angular providers. Currently it configures routing and component-input binding.

### `src/app/app.routes.ts`
Defines the URL contract:
- `/` — poll overview
- `/new` — create poll
- `/poll/:id` — poll detail and voting
- `**` — fallback page

### `src/app/app.ts`, `app.html`, `app.scss`
Render the persistent shell: brand, navigation, routed page content and footer. The root component intentionally does not query the database.

## Domain layer

### `domain/polls/poll.contracts.ts`
Defines framework-light application models.

Important distinction:
- database rows use persistence names such as `end_date`
- the domain uses application names such as `closesAt`

This prevents database naming from spreading through the UI.

### `domain/polls/poll.rules.ts`
Centralizes reusable rules:
- meaningful text validation
- whitespace normalization
- question/answer limits
- poll deadline calculations

A rule used by multiple pages belongs here instead of being copied into components.

## Application layer

### `application/polls/poll.facade.ts`
The facade is the page-facing API of the poll feature.

Responsibilities:
- load poll summaries
- load complete poll details
- map persistence records to domain models
- calculate vote totals and percentages
- create polls
- record votes

Pages therefore express user intentions instead of constructing database queries.

## Infrastructure layer

### `infrastructure/supabase/supabase.connector.ts`
Creates one shared Supabase browser client from the selected Angular environment.

Only public browser-safe configuration belongs in the frontend. A Supabase secret/service-role key must never be stored here.

### `infrastructure/polls/supabase-poll.store.ts`
Owns Supabase queries and writes for:
- `surveys`
- `questions`
- `answers`
- `votes`

This layer knows database table and column names; the rest of the application does not need to.

### Poll creation sequence

```text
Create survey
    ↓ survey id
Create question(s)
    ↓ question id(s)
Create answer rows
```

If child creation fails, the newly created survey is deleted so the application does not intentionally leave an incomplete poll.

## Presentation and rendering

### `pages/overview`
The page stores the fetched poll collection once.

Angular `computed()` derives:
- the visible open/closed/category-filtered list
- the three polls closing soon

**Why:** derived UI state should be calculated from one source instead of manually keeping several arrays synchronized.

### `pages/create-poll`
Uses Reactive Forms because questions and answers can be added and removed dynamically.

Responsibilities:
- editable form state
- validation feedback
- add/remove question and answer controls
- normalization into `PollDraft`
- publish loading/error state

Database queries are intentionally not part of the page.

### `pages/poll-detail`
Manages:
- temporary answer selection
- single vs. multiple choice behavior
- submit readiness
- vote feedback
- result refresh after voting
- browser-local repeat-vote marker

The browser marker improves UX but is **not** treated as a security boundary.

### `pages/not-found`
Handles unknown routes and provides a clean recovery path.

## HTML templates

Templates focus on:
- semantic markup
- Angular bindings
- accessible labels/states
- rendering current page state

Complex calculations and persistence operations stay in TypeScript.

## SCSS organization

- `src/styles.scss` — global reset/defaults only
- `src/app/app.scss` — persistent application shell
- page SCSS — page-specific responsive layout and interaction styles

Keeping styles scoped by responsibility reduces global side effects.

## Environment files

`environment.ts` and `environment.development.ts` isolate environment-dependent public client configuration from application code.

## Where should a change go?

| Change | Location |
| --- | --- |
| Page layout / visual styling | page HTML + SCSS |
| Temporary interaction state | page TypeScript |
| Shared validation/deadline rule | domain |
| Mapping / use-case orchestration | application facade |
| Table/query/write behavior | infrastructure store |
| Supabase client setup | connector + environment |
| URL/navigation behavior | routes |

This structure makes debugging more predictable because every responsibility has a defined home.
