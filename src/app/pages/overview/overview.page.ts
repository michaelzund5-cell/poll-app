/**
 * @file src/app/pages/overview/overview.page.ts
 * @description Poll overview page controller.
 *
 * Loads poll summaries and derives the visible open/closed/category views with Angular Signals.
 */

import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { POLL_CATEGORIES, PollCategory, PollSummary } from '../../domain/polls/poll.contracts';
import { daysRemaining, isClosed } from '../../domain/polls/poll.rules';
import { PollFacade } from '../../application/polls/poll.facade';

type ViewMode = 'open' | 'closed';

@Component({
  selector: 'app-overview-page',
  imports: [RouterLink],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.scss',
})
/**
 * Route controller for browsing polls.
 *
 * `allPolls` is the single source collection. Filtered/sorted lists are
 * computed from it so rendering state cannot drift out of sync.
 */
export class OverviewPage {
  private readonly pollsApi = inject(PollFacade);
  private readonly allPolls = signal<PollSummary[]>([]);

  readonly mode = signal<ViewMode>('open');
  readonly category = signal<PollCategory | 'all'>('all');
  readonly busy = signal(true);
  readonly problem = signal<string | null>(null);
  readonly categories = POLL_CATEGORIES;

  /** Polls matching the current open/closed mode and category filter. */
  readonly visiblePolls = computed(() => {
    const category = this.category();
    const shouldShowClosed = this.mode() === 'closed';
    return [...this.allPolls()]
      .filter((poll) => isClosed(poll.closesAt) === shouldShowClosed)
      .filter((poll) => category === 'all' || poll.category === category)
      .sort((left, right) => (left.closesAt?.getTime() ?? Number.MAX_SAFE_INTEGER) - (right.closesAt?.getTime() ?? Number.MAX_SAFE_INTEGER));
  });

  /** Up to three open polls whose deadline is within seven days. */
  readonly closingSoon = computed(() => this.allPolls()
    .filter((poll) => {
      const days = daysRemaining(poll.closesAt);
      return days !== null && days >= 0 && days <= 7;
    })
    .sort((left, right) => (left.closesAt?.getTime() ?? 0) - (right.closesAt?.getTime() ?? 0))
    .slice(0, 3));

  constructor() { void this.reload(); }

  setMode(mode: ViewMode): void { this.mode.set(mode); }
  setCategory(value: string): void { this.category.set(value as PollCategory | 'all'); }
  daysLabel(date?: Date): string {
    const days = daysRemaining(date);
    if (days === null) return 'No deadline';
    if (days < 0) return 'Closed';
    if (days === 0) return 'Ends today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  }

  /** Reloads summaries and owns the page's loading/error state. */
  async reload(): Promise<void> {
    this.busy.set(true); this.problem.set(null);
    try { this.allPolls.set(await this.pollsApi.browse()); }
    catch (error) { console.error(error); this.problem.set('Polls could not be loaded.'); }
    finally { this.busy.set(false); }
  }
}
