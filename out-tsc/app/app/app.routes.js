/**
 * @file src/app/app.routes.ts
 * @description Public routes.
 *
 * Survey creation intentionally has no route because it is a modal/overlay.
 */
import { NotFoundPage } from './pages/not-found/not-found.page';
import { OverviewPage } from './pages/overview/overview.page';
import { PollDetailPage } from './pages/poll-detail/poll-detail.page';
export const routes = [
    { path: '', component: OverviewPage, title: 'Poll App' },
    { path: 'poll/:id', component: PollDetailPage, title: 'Poll App | Survey' },
    { path: '**', component: NotFoundPage, title: 'Poll App | Not found' },
];
//# sourceMappingURL=app.routes.js.map