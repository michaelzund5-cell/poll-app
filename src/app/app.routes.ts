/**
 * @file src/app/app.routes.ts
 * @description Top-level route configuration.
 *
 * Maps public URLs to page components and provides a catch-all route for unknown URLs. Route definitions remain declarative and separate from component behavior.
 */

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SurveyDetail } from './components/survey-detail/survey-detail';
import { NotFound } from './components/not-found/not-found';

/**
 * Public route table.
 *
 * Specific routes are declared before the wildcard so valid URLs are matched first.
 * The wildcard provides a predictable fallback for any unknown path.
 */
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'survey/:id', component: SurveyDetail },
  { path: '**', component: NotFound },
];
