import { Routes } from '@angular/router';
import { OverviewPage } from './pages/overview/overview.page';
import { CreatePollPage } from './pages/create-poll/create-poll.page';
import { PollDetailPage } from './pages/poll-detail/poll-detail.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

export const routes: Routes = [
  { path: '', component: OverviewPage, title: 'Poll Workbench' },
  { path: 'new', component: CreatePollPage, title: 'Create poll' },
  { path: 'poll/:id', component: PollDetailPage, title: 'Poll' },
  { path: '**', component: NotFoundPage, title: 'Not found' },
];
