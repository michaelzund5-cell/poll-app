# PollApp

PollApp is an Angular application for creating surveys, collecting votes, and displaying survey results.

The application uses Supabase for persistence and follows a feature-oriented frontend architecture. Data access, domain logic, database models, and presentation logic are kept separate to avoid coupling Angular components directly to the persistence layer.

## Tech Stack

* Angular 22
* TypeScript
* SCSS
* Supabase
* Angular Signals
* Reactive Forms
* Vitest
* Node.js 24 LTS

## Architecture

Survey functionality is organized around four main layers:

```text
Component
    │
    ▼
SurveyService
    │
    ▼
SurveyRepository
    │
    ▼
Supabase
```

### Components

Components are responsible for presentation, user interaction, and local UI state.

Database access and persistence-specific transformations are intentionally kept outside the component layer. This keeps components focused on the behavior required by their views.

### Service

`SurveyService` provides the application-facing API for survey operations and owns survey-related state and business logic.

Components depend on this service rather than accessing Supabase directly.

### Repository

`SurveyRepository` contains the persistence logic for surveys, questions, answers, and votes.

Keeping database operations behind the repository provides a single boundary between the application and Supabase. Changes to queries or the persistence implementation can therefore be made without spreading database-specific logic throughout the UI.

### DTO Mapping

Database records and application models are represented separately.

```text
Supabase
   │
   ▼
SurveyDto
   │
   ▼
SurveyMapper
   │
   ▼
Survey
```

DTOs reflect the database schema, while domain models represent the structures used by the application.

This prevents database conventions such as `created_at`, `end_date`, or `allow_multiple` from becoming part of the component API.

## State Management

Angular Signals are used for local and survey-related state.

Derived values are implemented with `computed()` where possible instead of maintaining additional synchronized state manually.

This also removes the need for explicit `ChangeDetectorRef.detectChanges()` calls in the survey flow.

## Type Safety

The survey domain is strictly typed.

Categories are defined from a readonly constant:

```ts
export const SURVEY_CATEGORIES = [
  'Team Activities',
  'Health & Wellness',
  'Gaming & Entertainment',
  'Education & Learning',
  'Lifestyle & Preferences',
  'Technology & Innovation',
] as const;

export type SurveyCategory =
  (typeof SURVEY_CATEGORIES)[number];
```

The same approach is used for survey, question, answer, DTO, and form-related data instead of falling back to `any`.

## Project Structure

```text
src/app/
├── components/
│   ├── header/
│   ├── hero/
│   ├── home/
│   ├── new-survey/
│   ├── survey-detail/
│   └── surveys/
│
├── core/
│   └── data-access/
│       └── supabase-client.service.ts
│
└── features/
    └── surveys/
        ├── constants/
        │   └── survey.constants.ts
        │
        ├── data-access/
        │   ├── survey.mapper.ts
        │   └── survey.repository.ts
        │
        ├── models/
        │   ├── survey.dto.ts
        │   └── survey.model.ts
        │
        ├── services/
        │   └── survey.service.ts
        │
        └── utils/
            └── survey-date.util.ts
```

`core` contains application-wide infrastructure.

Survey-specific code stays inside the survey feature. Components consume the feature API without needing knowledge of how survey data is persisted.

## Design Decisions

### Repository instead of direct Supabase access

Direct Supabase calls from components would couple UI code to the database schema and make persistence concerns part of presentation logic.

The repository provides one location for queries and mutations instead.

### Separate DTOs and domain models

The database schema and frontend model have different responsibilities and are allowed to evolve independently.

Mapping at the data boundary makes that distinction explicit.

### Signals instead of manual change detection

Survey state is reactive. Signals and computed state provide the required update behavior without manually triggering Angular change detection.

### Centralized domain constants

Survey categories, limits, and other domain values are defined centrally rather than repeated as string literals or magic numbers.

### Extracted date calculations

Date-related calculations are implemented as reusable utilities instead of being duplicated across components.

This also makes the calculations independently testable.

### No unnecessary abstraction

The architecture deliberately stops at boundaries that provide practical value.

Presentation remains in components, business behavior in the service, persistence in the repository, and database transformations in the mapper. Additional layers are only introduced when they have a concrete responsibility.

## Development

### Requirements

* Node.js 24.15.0 or newer
* npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application is available at:

```text
http://localhost:4200
```

## Build

Create a production build with:

```bash
npm run build
```

Build artifacts are written to `dist/`.

## Tests

Run the test suite with:

```bash
npm test
```

The survey feature includes tests for isolated domain functionality such as DTO mapping and date utilities.

## Current Scope

The application currently covers the core survey workflow:

* Create surveys
* Configure questions and answers
* Browse surveys
* Filter surveys
* Open survey details
* Submit votes
* Display results

Further functionality can be added through the survey feature without moving persistence or business logic back into the component layer.
