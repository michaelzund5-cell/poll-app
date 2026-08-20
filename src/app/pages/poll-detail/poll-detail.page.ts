/**
 * @file src/app/pages/poll-detail/poll-detail.page.ts
 * @description Survey detail, vote selection and live-result controller.
 */

import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { PollChoice, PollDetails, PollPrompt } from '../../domain/polls/poll.contracts';
import { isClosed } from '../../domain/polls/poll.rules';

@Component({
  selector: 'app-poll-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './poll-detail.page.html',
  styleUrl: './poll-detail.page.scss',
})
export class PollDetailPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly polls = inject(PollFacade);
  private readonly pollId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly votedKey = `poll-app:voted:${this.pollId}`;
  private stopRealtime?: () => void;

  readonly poll = signal<PollDetails | null>(null);
  readonly selected = signal<Record<number, number[]>>({});
  readonly busy = signal(true);
  readonly saving = signal(false);
  readonly problem = signal<string | null>(null);
  readonly feedback = signal<string | null>(this.initialFeedback());
  readonly alreadyVoted = signal(this.readVoteMarker());
  readonly locked = computed(() => this.alreadyVoted() || isClosed(this.poll()?.closesAt));

  constructor() {
    void this.load();
    this.stopRealtime = this.polls.watchVotes(() => void this.load(false));
  }

  /** Stops the realtime subscription when the page is destroyed. */
  ngOnDestroy(): void {
    this.stopRealtime?.();
  }

  /** Clears the current user feedback message. */
  dismissFeedback(): void {
    this.feedback.set(null);
  }

  /**
   * Checks whether a specific answer is currently selected.
   * @param questionId Question id.
   * @param answerId Answer id.
   * @returns Whether the answer is selected.
   */
  isSelected(questionId: number, answerId: number): boolean {
    return (this.selected()[questionId] ?? []).includes(answerId);
  }

  /**
   * Updates the selected answers for a question.
   * @param questionId Question id.
   * @param answerId Answer id.
   * @param multiple Whether multiple answers are allowed.
   */
  toggle(questionId: number, answerId: number, multiple: boolean): void {
    if (this.locked()) return;
    this.selected.update((current) => ({
      ...current,
      [questionId]: this.nextSelection(current[questionId] ?? [], answerId, multiple),
    }));
  }

  /**
   * Calculates the result percentage including the local preview.
   * @param prompt Poll prompt.
   * @param choice Poll choice.
   * @returns Percentage including the current preview selection.
   */
  livePercentage(prompt: PollPrompt, choice: PollChoice): number {
    if (this.locked()) return choice.percentage;
    const selectedIds = this.selected()[prompt.id] ?? [];
    const votes = choice.votes + Number(selectedIds.includes(choice.id));
    const total = prompt.totalVotes + selectedIds.length;
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  }

  /**
   * Calculates the vote count including the local preview.
   * @param prompt Poll prompt.
   * @param choice Poll choice.
   * @returns Vote count including preview selection.
   */
  liveVotes(prompt: PollPrompt, choice: PollChoice): number {
    const preview = !this.locked() && this.isSelected(prompt.id, choice.id);
    return choice.votes + Number(preview);
  }

  /**
   * Creates the alphabetic label used for an answer.
   * @param index Zero-based answer index.
   * @returns Alphabetic answer label.
   */
  answerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Checks whether the current form state can be submitted.
   * @returns Whether every prompt has at least one selected answer.
   */
  canSubmit(): boolean {
    const current = this.poll();
    if (!current || current.prompts.length === 0) return false;
    return current.prompts.every((prompt) =>
      (this.selected()[prompt.id] ?? []).length > 0,
    );
  }

  /**
   * Persists the current vote and refreshes live results.
   * @returns Promise completed after submission.
   */
  async submitVote(): Promise<void> {
    if (!this.canSubmit() || this.locked() || this.saving()) return;
    this.startVoteSave();
    try {
      await this.saveVote();
    } catch (error) {
      this.handleVoteError(error);
    } finally {
      this.saving.set(false);
    }
  }

  /**
   * Loads the current survey and updates page state.
   * @param showSpinner Whether to show loading state.
   * @returns Promise completed after loading.
   */
  async load(showSpinner = true): Promise<void> {
    if (!this.hasValidPollId()) return;
    if (showSpinner) this.busy.set(true);
    try {
      this.applyLoadedPoll(await this.polls.open(this.pollId));
    } catch (error) {
      this.handleLoadError(error);
    } finally {
      this.busy.set(false);
    }
  }

  /**
   * Formats a survey deadline for display.
   * @param date Optional date.
   * @returns Date formatted for the survey UI.
   */
  formatDate(date?: Date): string {
    if (!date) return 'No deadline';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  /**
   * Builds feedback shown after creating a survey.
   * @returns Success feedback when arriving after survey creation.
   */
  private initialFeedback(): string | null {
    return this.route.snapshot.queryParamMap.get('created') === '1'
      ? 'Survey published successfully.'
      : null;
  }

  /**
   * Builds the next answer selection after a toggle.
   * @param previous Current selected ids.
   * @param answerId Toggled answer id.
   * @param multiple Multiple-choice flag.
   * @returns Next selection.
   */
  private nextSelection(previous: number[], answerId: number, multiple: boolean): number[] {
    if (!multiple) return [answerId];
    return previous.includes(answerId)
      ? previous.filter((id) => id !== answerId)
      : [...previous, answerId];
  }

  /** Sets state before vote persistence begins. */
  private startVoteSave(): void {
    this.saving.set(true);
    this.feedback.set(null);
  }

  /**
   * Persists the selection, locks the survey and refreshes results.
   * @returns Promise completed after refresh.
   */
  private async saveVote(): Promise<void> {
    await this.polls.vote(Object.values(this.selected()).flat());
    this.writeVoteMarker();
    this.alreadyVoted.set(true);
    this.selected.set({});
    this.feedback.set('Vote saved. Live results were updated.');
    await this.load(false);
  }

  /**
   * Logs a vote failure and exposes user feedback.
   * @param error Vote persistence failure.
   */
  private handleVoteError(error: unknown): void {
    console.error('Vote submission failed', error);
    this.feedback.set('Your vote could not be saved.');
  }

  /**
   * Checks whether the route contains a valid survey id.
   * @returns Whether the route contains a valid numeric survey id.
   */
  private hasValidPollId(): boolean {
    if (Number.isFinite(this.pollId)) return true;
    this.problem.set('Invalid survey id.');
    this.busy.set(false);
    return false;
  }

  /**
   * Applies loaded survey data to page state.
   * @param current Loaded survey or null.
   */
  private applyLoadedPoll(current: PollDetails | null): void {
    this.poll.set(current);
    this.problem.set(current ? null : 'This survey does not exist.');
  }

  /**
   * Logs a loading failure and exposes user feedback.
   * @param error Survey load failure.
   */
  private handleLoadError(error: unknown): void {
    console.error('Survey loading failed', error);
    this.problem.set('The survey could not be loaded.');
  }

  /**
   * Reads whether this browser has already voted.
   * @returns Whether this browser has already voted on the survey.
   */
  private readVoteMarker(): boolean {
    try {
      return Boolean(localStorage.getItem(this.votedKey));
    } catch (error) {
      console.warn('Vote marker could not be read', error);
      return false;
    }
  }

  /** Writes the local vote marker and warns when browser storage is unavailable. */
  private writeVoteMarker(): void {
    try {
      localStorage.setItem(this.votedKey, new Date().toISOString());
    } catch (error) {
      console.warn('Vote marker could not be stored', error);
    }
  }
}
