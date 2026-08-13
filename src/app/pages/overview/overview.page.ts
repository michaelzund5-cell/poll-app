/**
 * @file src/app/pages/overview/overview.page.ts
 * @description Home controller for sorting and filtering surveys.
 */

import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import {
  POLL_CATEGORIES,
  PollCategory,
  PollSummary,
} from '../../domain/polls/poll.contracts';
import {
  deadlineTimestamp,
  daysRemaining,
  isClosed,
  POLL_LIMITS,
} from '../../domain/polls/poll.rules';
import { CreatePollDialogService } from '../../presentation/create-poll-dialog/create-poll-dialog.service';

type SurveyMode = 'open' | 'closed';
type CategoryFilter = PollCategory | 'all';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.scss',
})
export class OverviewPage {
  private readonly pollFacade = inject(PollFacade);
  private readonly source = signal<PollSummary[]>([]);

  readonly createDialog = inject(CreatePollDialogService);
  readonly mode = signal<SurveyMode>('open');
  readonly openCategory = signal<CategoryFilter>('all');
  readonly closedCategory = signal<CategoryFilter>('all');
  readonly busy = signal(true);
  readonly problem = signal<string | null>(null);
  readonly categories = POLL_CATEGORIES;

  readonly activeCategory = computed(() =>
    this.mode() === 'open' ? this.openCategory() : this.closedCategory(),
  );

  readonly visiblePolls = computed(() => {
    const closed = this.mode() === 'closed';
    const category = this.activeCategory();

    return [...this.source()]
      .filter((poll) => isClosed(poll.closesAt) === closed)
      .filter((poll) => category === 'all' || poll.category === category)
      .sort(
        (left, right) =>
          deadlineTimestamp(left.closesAt) -
          deadlineTimestamp(right.closesAt),
      );
  });

  readonly closingSoon = computed(() =>
    [...this.source()]
      .filter((poll) => !isClosed(poll.closesAt))
      .filter((poll) => {
        const days = daysRemaining(poll.closesAt);
        return (
          days !== null &&
          days >= 0 &&
          days <= POLL_LIMITS.endingSoonDays
        );
      })
      .sort(
        (left, right) =>
          deadlineTimestamp(left.closesAt) -
          deadlineTimestamp(right.closesAt),
      )
      .slice(0, 3),
  );

  constructor() {
    void this.reload();
  }

  setMode(mode: SurveyMode): void {
    this.mode.set(mode);
  }

  setCategory(value: string): void {
    const category = value as CategoryFilter;

    if (this.mode() === 'open') {
      this.openCategory.set(category);
      return;
    }

    this.closedCategory.set(category);
  }

  deadlineLabel(date?: Date): string {
    const days = daysRemaining(date);

    if (days === null) return 'No deadline';
    if (days < 0) return 'Closed';
    if (days === 0) return 'Ends today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  }

  async reload(): Promise<void> {
    this.busy.set(true);
    this.problem.set(null);

    try {
      this.source.set(await this.pollFacade.browse());
    } catch (error) {
      console.error('Survey list loading failed', error);
      this.problem.set('Surveys could not be loaded.');
    } finally {
      this.busy.set(false);
    }
  }
}


