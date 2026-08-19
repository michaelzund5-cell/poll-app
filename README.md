# Poll App

Poll App is a survey application built with Angular and Supabase.

Users can create surveys, browse available surveys, filter them by category, participate in active surveys and view survey results.

## Installation and start

Install the required dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

If Angular CLI is not installed globally:

```bash
npx ng serve
```

The application is available at:

```text
http://localhost:4200
```

## Project architecture

The project is divided into different areas to separate the responsibilities of the application.

```text
src/app/
├── domain/
│   └── polls/                  # Poll models and rules
├── application/
│   └── polls/                  # Application logic
├── infrastructure/
│   ├── polls/                  # Supabase communication
│   └── supabase/               # Supabase configuration
├── presentation/
│   └── create-poll-dialog/     # Survey creation dialog
└── pages/
    ├── overview/               # Survey overview
    ├── poll-detail/            # Survey details and voting
    └── not-found/              # Fallback page
```

## Features

### Survey overview

The overview displays available surveys and separates active and past surveys.

Users can filter surveys by category and open a survey to view its details.

Surveys that are close to their deadline are displayed in the **Ending soon** section.

### Create survey

Users can create a new survey through the survey dialog.

A survey can contain:

* Title
* Description
* Category
* End date
* Questions
* Answer options
* Single-choice or multiple-choice questions

Required fields are validated before the survey can be created.

### Voting

Active surveys can be answered on the survey detail page.

Depending on the question type, users can select one or multiple answers.

Past surveys can still be viewed, but voting is disabled.

### Results

Survey results are displayed on the survey detail page.

Submitted votes are stored using Supabase and the result percentages are displayed to the user.

## Technologies

* Angular
* TypeScript
* SCSS
* Supabase
