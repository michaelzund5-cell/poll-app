/**
 * @file src/app/pages/overview/overview.page.ts
 * @description Home controller for sorting and filtering surveys.
 */

import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { POLL_CATEGORIES, PollCategory, PollSummary } from '../../domain/polls/poll.contracts';
import { deadlineTimestamp, daysRemaining, isClosed, POLL_LIMITS } from '../../domain/polls/poll.rules';
import { CreatePollDialogService } from '../../presentation/create-poll-dialog/create-poll-dialog.service';

type SurveyMode = 'open' | 'closed' | null;
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

  readonly activeCategory = computed(() => this.currentCategory());
  readonly visiblePolls = computed(() => this.filteredPolls());
  readonly closingSoon = computed(() => this.findClosingSoon());
  readonly endingSoonDisplay = computed(() => this.buildEndingSoonDisplay());

  constructor() {
    void this.reload();
  }

  /**
   * Updates the selected survey status filter.
   * @param mode Status filter to toggle.
   */
  setMode(mode: SurveyMode): void {
    this.mode.set(this.mode() === mode ? null : mode);
  }

  /**
   * Updates the category filter for the active status tab.
   * @param value Category filter value.
   */
  setCategory(value: string): void {
    const category = value as CategoryFilter;
    if (this.mode() === 'open') {
      this.openCategory.set(category);
      return;
    }
    this.closedCategory.set(category);
  }

  /**
   * Creates the deadline label displayed in the overview.
   * @param date Optional deadline.
   * @returns Human-readable deadline label.
   */
  deadlineLabel(date?: Date): string {
    const days = daysRemaining(date);
    if (days === null) return 'No deadline';
    if (days < 0) return 'Closed';
    if (days === 0) return 'Ends today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  }

  /**
   * Reloads survey summaries and updates loading/error state.
   * @returns Promise completed after loading.
   */
  async reload(): Promise<void> {
    this.startLoading();
    try {
      this.source.set(await this.pollFacade.browse());
    } catch (error) {
      this.handleLoadError(error);
    } finally {
      this.busy.set(false);
    }
  }

  /**
   * Returns the category filter for the active status tab.
   * @returns Category filter for the currently selected status tab.
   */
  private currentCategory(): CategoryFilter {
    return this.mode() === 'closed' ? this.closedCategory() : this.openCategory();
  }

  /**
   * Builds the sorted survey list for the current filters.
   * @returns Surveys matching status and category, sorted by deadline.
   */
  private filteredPolls(): PollSummary[] {
    return [...this.source()]
      .filter((poll) => this.matchesMode(poll))
      .filter((poll) => this.matchesCategory(poll))
      .sort(this.byDeadline);
  }

  /**
   * Checks whether a survey matches the selected status.
   * @param poll Survey summary.
   * @returns Whether it matches the selected status.
   */
  private matchesMode(poll: PollSummary): boolean {
    const mode = this.mode();
    return mode === null || isClosed(poll.closesAt) === (mode === 'closed');
  }

  /**
   * Checks whether a survey matches the selected category.
   * @param poll Survey summary.
   * @returns Whether it matches the selected category.
   */
  private matchesCategory(poll: PollSummary): boolean {
    const category = this.currentCategory();
    return category === 'all' || poll.category === category;
  }

  /**
   * Finds open surveys within the ending-soon window.
   * @returns Up to three open surveys ending inside the configured window.
   */
  private findClosingSoon(): PollSummary[] {
    return [...this.source()]
      .filter((poll) => !isClosed(poll.closesAt))
      .filter((poll) => this.isEndingSoon(poll))
      .sort(this.byDeadline)
      .slice(0, 3);
  }

  /**
   * Checks whether a survey is close to its deadline.
   * @param poll Survey summary.
   * @returns Whether its deadline is in the ending-soon window.
   */
  private isEndingSoon(poll: PollSummary): boolean {
    const days = daysRemaining(poll.closesAt);
    return days !== null && days >= 0 && days <= POLL_LIMITS.endingSoonDays;
  }

  /**
   * Builds the three-card ending-soon display.
   * @returns Three ending-soon cards, filled with nearest open surveys when needed.
   */
  private buildEndingSoonDisplay(): PollSummary[] {
    const urgent = this.findClosingSoon();
    if (urgent.length >= 3) return urgent.slice(0, 3);
    const urgentIds = new Set(urgent.map((poll) => poll.id));
    const fallback = this.availableFallbacks(urgentIds);
    return [...urgent, ...fallback].slice(0, 3);
  }

  /**
   * Finds fallback surveys not already shown as urgent.
   * @param excludedIds Survey ids already displayed.
   * @returns Nearest open fallback surveys.
   */
  private availableFallbacks(excludedIds: Set<number>): PollSummary[] {
    return [...this.source()]
      .filter((poll) => !isClosed(poll.closesAt))
      .filter((poll) => !excludedIds.has(poll.id))
      .sort(this.byDeadline);
  }

  /** Resets overview loading feedback before a request. */
  private startLoading(): void {
    this.busy.set(true);
    this.problem.set(null);
  }

  /**
   * Logs a loading failure and exposes user feedback.
   * @param error Request failure for developer logging.
   */
  private handleLoadError(error: unknown): void {
    console.error('Survey list loading failed', error);
    this.problem.set('Surveys could not be loaded.');
  }

  /**
   * Creates a sortable timestamp for an optional deadline.
   * @param left First survey.
   * @param right Second survey.
   * @returns Deadline sort difference.
   */
  private readonly byDeadline = (left: PollSummary, right: PollSummary): number =>
    deadlineTimestamp(left.closesAt) - deadlineTimestamp(right.closesAt);
}
