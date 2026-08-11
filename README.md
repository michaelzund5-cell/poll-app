# Poll Workbench

Poll Workbench is an Angular survey application for creating, browsing, voting on and evaluating polls.

The project uses a layered architecture to separate presentation, application logic, domain rules and external infrastructure. The goal is to keep responsibilities clearly defined and prevent database-specific logic from spreading into Angular page components.

## Technology Stack

- Angular
- TypeScript
- SCSS
- Angular Signals
- Supabase
- Git

## Getting Started

Install all dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

The generated browser application is written to:

```text
dist/poll-workbench/browser
```

## Architecture

The application is divided into four main areas:

```text
src/app/
├── domain/
│   └── polls/
├── application/
│   └── polls/
├── infrastructure/
│   ├── polls/
│   └── supabase/
└── pages/
```

The dependency flow is intentionally kept in one direction:

```text
Pages
  ↓
Application
  ↓
Domain
  ↑
Infrastructure
  ↓
Supabase
```

Each layer has a specific responsibility.

### Domain Layer

`domain/polls`

The domain layer contains the core data structures and rules of the poll system.

It describes what a poll, question, answer or vote represents without depending directly on Angular components or Supabase.

Keeping these rules independent makes the core application logic easier to understand, test and reuse.

### Application Layer

`application/polls`

The application layer coordinates the use cases of the poll system.

Examples include:

- loading available polls
- creating a poll
- submitting votes
- retrieving poll results
- mapping persistence data into structures used by the application

Angular pages therefore do not need to know how database operations are implemented.

### Infrastructure Layer

`infrastructure/supabase`

and

`infrastructure/polls`

The infrastructure layer handles communication with external systems.

The Supabase client configuration is separated from the poll persistence implementation.

Database queries, inserts and updates belong here instead of inside Angular components.

This keeps database-specific code isolated and makes it possible to replace or modify the persistence implementation without restructuring the complete UI.

## Presentation Layer

`pages`

Pages are responsible for rendering application state and handling user interaction.

They communicate with the application layer instead of accessing Supabase directly.

Angular Signals and computed state are used where appropriate so that the UI reacts automatically when application state changes.

This reduces manually synchronized UI state and keeps rendering logic predictable.

## Data Flow

Reading poll data follows this flow:

```text
User opens page
      ↓
Angular Page
      ↓
Application Service
      ↓
Poll Persistence
      ↓
Supabase
      ↓
Database response
      ↓
Domain/Application mapping
      ↓
Angular state
      ↓
UI rendering
```

Writing data follows the same separation:

```text
User input
    ↓
Validation
    ↓
Application Layer
    ↓
Infrastructure Layer
    ↓
Supabase
```

The page itself is therefore not responsible for constructing database queries.

## Database

Supabase provides the persistence layer.

The application uses four main tables:

```text
surveys
questions
answers
votes
```

Their responsibilities are separated:

- `surveys` stores general poll information.
- `questions` stores questions belonging to a survey.
- `answers` stores selectable answers belonging to questions.
- `votes` stores submitted answer selections.

Relationships between these records allow a complete poll to be reconstructed without storing all information inside a single database row.

## Validation

Validation is handled before invalid data reaches the persistence layer.

The application prevents:

- empty required fields
- whitespace-only input
- invalid survey structures
- incomplete questions
- invalid answer configurations

This provides immediate feedback to the user while also keeping invalid application state away from database operations.

## Voting

Voting is separated from poll rendering.

After a vote is submitted, the application refreshes the relevant result state so the displayed values represent the current poll state.

A local browser marker prevents the same browser from repeatedly voting on the same poll.

Completed or unavailable polls disable the complete answer interaction instead of only disabling individual controls.

## Responsive Design

The interface is designed to work from small mobile screens upward.

Important UI rules include:

- responsive layout from approximately 320px
- readable base text sizes
- controls that remain usable on touch devices
- content that does not overflow the viewport
- reserved validation space to avoid unnecessary layout shifts
- adaptive poll and form layouts

## Design Decisions

The architecture intentionally contains more separation than putting database calls directly into Angular components.

This was chosen because each part can evolve independently:

```text
UI changes          → pages
business rules      → domain/application
database changes    → infrastructure
Supabase setup      → Supabase infrastructure
```

A change to the database implementation therefore should not require rewriting the presentation layer.

The result is a codebase with clearer responsibilities, a predictable data flow and components that remain focused primarily on rendering and user interaction.

## Source Documentation

All relevant TypeScript, HTML and SCSS source files contain focused file-level documentation. Important classes and non-obvious methods additionally use JSDoc to explain responsibility and intent.

For a file-by-file architectural guide and rendering/data-flow explanation, see [`CODE_DOCUMENTATION.md`](./CODE_DOCUMENTATION.md).

The comments focus on **why** a decision exists instead of repeating self-explanatory syntax.
