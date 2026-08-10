# Poll Workbench

A fresh Angular implementation of a small survey application. The project is organized around domain, application and infrastructure boundaries rather than database or UI files being mixed together.

## Run locally

```bash
npm install
npm start
```

## Production build

```bash
npm run build
```

The static browser output is written to `dist/poll-workbench/browser`.

## Architecture

- `domain/polls`: framework-light poll contracts and validation rules
- `application/polls`: use-case facade and persistence-to-domain mapping
- `infrastructure/supabase`: Supabase client setup
- `infrastructure/polls`: database queries and writes
- `pages`: route-level Angular UI

## Database

The application uses the project-owned Supabase instance and the tables `surveys`, `questions`, `answers` and `votes`.

## UX rules

- responsive from 320px upward
- base text size 16px
- whitespace-only input is rejected
- validation messages reserve layout space
- a browser can vote only once per poll via a local marker
- results are refreshed after voting
- disabled polls disable the full answer interaction
