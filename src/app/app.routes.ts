/**
 * @file src/app/app.routes.ts
 * @description Public routes.
 *
 * Survey creation intentionally has no route because it is a modal/overlay.
 */

import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { OverviewPage } from './pages/overview/overview.page';
import { PollDetailPage } from './pages/poll-detail/poll-detail.page';

export const routes: Routes = [
  { path: '', component: OverviewPage, title: 'Poll App' },
  { path: 'poll/:id', component: PollDetailPage, title: 'Poll App | Survey' },
  { path: '**', component: NotFoundPage, title: 'Poll App | Not found' },
];
