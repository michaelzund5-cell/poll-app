# Poll App

Poll App is a responsive survey application built with **Angular** and **Supabase**. It allows users to create surveys, participate in active surveys and view live results.

The application was developed with a focus on a clear user experience, responsive design and a structured separation between UI, application logic, domain rules and data access.

## Features

### Survey overview

The overview page provides a central place to discover and manage available surveys.

Users can:

* View surveys that are ending soon
* Browse active and past surveys separately
* Filter surveys by category
* See the remaining time until a survey ends
* Open surveys directly from the overview
* Access the survey creation dialog

Surveys that are close to their deadline are displayed separately in the **Ending soon** section so that users can quickly identify surveys that are about to expire.

### Create surveys

New surveys can be created through a modal dialog without navigating to a separate page.

A survey contains:

* Survey title
* Description
* Category
* Optional deadline
* One or multiple questions
* Answer options
* Single-choice or multiple-choice questions

Required fields are validated before a survey can be published. Empty or whitespace-only values are rejected.

Input fields with a maximum text length provide feedback to the user so that limitations are visible while entering content.

### Participate in surveys

Active surveys can be opened from the overview page.

The survey detail page displays:

* Survey information
* Category
* Deadline
* Questions and answer options
* Voting controls
* Live survey results

Depending on the question type, participants can select either one answer or multiple answers.

After a survey has expired, it remains accessible for viewing, but voting controls are disabled.

### Live results

Survey results are displayed alongside the survey on desktop devices.

The result view shows the distribution of submitted answers using percentage-based progress bars.

Votes are stored in Supabase. The application uses Supabase Realtime to refresh results when new votes are submitted.

This allows survey results to update without requiring the user to manually reload the page.

## Responsive design

Poll App is designed for:

* Desktop
* Tablet
* Mobile devices

The layout adapts depending on the available screen width.

On desktop, the survey and its results can be displayed next to each other. On smaller screens, the content is reorganized to remain usable without unnecessary horizontal page scrolling.

The **Ending soon** surveys use a horizontal layout on smaller devices so users can swipe through the available surveys.

## Categories

Surveys can be organized into different categories, including:

* Team Activities
* Health & Wellness
* Gaming & Entertainment
* Education & Learning
* Lifestyle & Preferences
* Technology & Innovation

The overview provides a category filter to make it easier to find relevant surveys.

Active and past surveys maintain their own filtering state.

## Technology stack

The project uses:

* **Angular**
* **TypeScript**
* **SCSS**
* **Supabase**
* **Supabase Realtime**
* **HTML**
* **npm**

Angular is responsible for the frontend application and component structure, while Supabase provides persistence and realtime functionality.

## Project architecture

The application separates responsibilities into multiple layers:

```text
src/app/
├── domain/
│   └── polls/
│       # Domain contracts and reusable business rules
│
├── application/
│   └── polls/
│       # Application use cases and domain/persistence mapping
│
├── infrastructure/
│   ├── polls/
│   │   # Supabase queries, writes and realtime communication
│   │
│   └── supabase/
│       # Supabase client configuration
│
├── presentation/
│   └── create-poll-dialog/
│       # Survey creation modal
│
└── pages/
    ├── overview/
    │   # Survey overview, ending-soon surveys,
    │   # status tabs and category filtering
    │
    ├── poll-detail/
    │   # Survey participation and live results
    │
    └── not-found/
        # Fallback for unknown routes
```

### Domain layer

The domain layer contains reusable poll-related rules and contracts. It does not depend on the visual representation of the application.

### Application layer

The application layer coordinates the application's use cases and connects domain models with persistence data.

### Infrastructure layer

The infrastructure layer handles communication with Supabase, including database queries, writes and realtime updates.

### Presentation layer

Reusable UI functionality such as the survey creation dialog is located in the presentation layer.

### Pages

Pages represent the main views of the application, including the survey overview and survey detail view.

## Supabase

Supabase is used as the backend service for the application.

It is responsible for storing survey information and submitted votes.

The application also uses **Supabase Realtime** to detect new votes and refresh displayed survey results.

Supabase-specific communication is separated from the UI through the infrastructure layer.

## Installation

Clone the repository and install the required dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
npm start
```

The application can then be opened locally in the browser.

By default, Angular development servers are commonly available at:

```text
http://localhost:4200
```

## Production build

Create a production build with:

```bash
npm run build
```

Angular generates the compiled application inside the `dist` directory.

Generated build files, Angular cache files and installed npm dependencies are not part of the repository and can be recreated locally when required.

## Project structure and repository

The repository contains the application source code and configuration required to install, develop and build Poll App.

Generated or machine-specific directories such as the following should not be committed:

```text
node_modules/
.angular/
dist/
```

Dependencies can be restored using `npm install`, while production files can be recreated using `npm run build`.

## Additional documentation

More detailed technical information about the implementation and code structure can be found in:

```text
CODE_DOCUMENTATION.md
```
