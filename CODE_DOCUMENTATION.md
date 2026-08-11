# Code Documentation

## Dependency flow

```text
Pages / Presentation
        ↓
    PollFacade
        ↓
SupabasePollStore
        ↓
SupabaseConnector
        ↓
     Supabase
```

## Domain

`poll.contracts.ts` contains application-friendly models.

`poll.rules.ts` contains reusable validation, deadline and sorting logic.

## Application

`poll.facade.ts` exposes the poll use cases to the UI and translates persistence
rows into domain models. Vote percentages are calculated here instead of inside
templates or database code.

## Infrastructure

`supabase-poll.store.ts` owns all table names, queries, inserts and the Realtime
subscription for vote inserts.

`supabase.connector.ts` creates the browser-safe Supabase client.

## Presentation

`create-poll-dialog` implements New Survey as a real modal instead of a route.
Reactive Forms validate required values before a domain draft is created.

## Overview page

The page stores one source survey list. Angular computed signals derive:

- ending-soon surveys
- open surveys
- past surveys
- category filtered results

Open/Past maintain separate category state so filters never get mixed.

## Poll detail page

Temporary answer selection is kept in page state.

On desktop:
- left column = voting
- right column = current results

The result preview reacts immediately to selections. After submission the
persisted result is reloaded. Supabase Realtime also refreshes the result when
another browser inserts a vote.

Past surveys and already-voted surveys set the page into a locked state, which
disables every answer control and blocks submission.

## Responsive behavior

- Home cards collapse to one column.
- New Survey becomes a mobile bottom-sheet style dialog.
- Detail switches from two columns to one stacked column under 900px.
- Typography and controls remain readable/touch-friendly from 320px upward.
