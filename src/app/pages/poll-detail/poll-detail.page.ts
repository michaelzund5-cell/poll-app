/**
 * @file src/app/pages/poll-detail/poll-detail.page.ts
 * @description Poll detail page controller.
 *
 * Loads a complete poll, manages local answer selection, records votes and refreshes result state after submission.
 */

import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { PollDetails } from '../../domain/polls/poll.contracts';
import { isClosed } from '../../domain/polls/poll.rules';

@Component({
  selector: 'app-poll-detail-page',
  imports: [RouterLink],
  templateUrl: './poll-detail.page.html',
  styleUrl: './poll-detail.page.scss',
})
/**
 * Route controller for poll voting and result rendering.
 *
 * Answer selection remains local until submission. After a successful vote the
 * poll is reloaded so displayed percentages reflect the latest persisted state.
 */
export class PollDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly polls = inject(PollFacade);
  private readonly pollId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly votedKey = `poll-workbench:voted:${this.pollId}`;

  readonly poll = signal<PollDetails | null>(null);
  readonly selected = signal<Record<number, number[]>>({});
  readonly busy = signal(true);
  readonly saving = signal(false);
  readonly problem = signal<string | null>(null);
  readonly feedback = signal<string | null>(this.route.snapshot.queryParamMap.get('created') === '1' ? 'Poll published successfully.' : null);
  readonly alreadyVoted = signal(this.readVoteMarker());
  readonly locked = computed(() => this.alreadyVoted() || isClosed(this.poll()?.closesAt));

  constructor() { void this.load(); }

  isSelected(questionId: number, answerId: number): boolean { return (this.selected()[questionId] ?? []).includes(answerId); }
  previewCount(questionId: number): number { return (this.selected()[questionId] ?? []).length; }

  /**
   * Updates temporary selection state.
   * Single-choice prompts replace the previous selection; multi-choice prompts toggle it.
   */
  toggle(questionId: number, answerId: number, multiple: boolean): void {
    if (this.locked()) return;
    this.selected.update((current) => {
      const previous = current[questionId] ?? [];
      const next = multiple
        ? (previous.includes(answerId) ? previous.filter((id) => id !== answerId) : [...previous, answerId])
        : [answerId];
      return { ...current, [questionId]: next };
    });
  }

  /** True only when every question has at least one selected answer. */
  canSubmit(): boolean {
    const poll = this.poll();
    return Boolean(poll && poll.prompts.length > 0 && poll.prompts.every((prompt) => this.previewCount(prompt.id) > 0));
  }

  /**
   * Saves selected answers, records the browser marker and refreshes results.
   */
  async submitVote(): Promise<void> {
    if (!this.canSubmit() || this.locked() || this.saving()) return;
    this.saving.set(true); this.feedback.set(null);
    try {
      const answerIds = Object.values(this.selected()).flat();
      await this.polls.vote(answerIds);
      localStorage.setItem(this.votedKey, new Date().toISOString());
      this.alreadyVoted.set(true);
      this.feedback.set('Vote saved. The results below now include your response.');
      await this.load(false);
    } catch (error) { console.error(error); this.feedback.set('Your vote could not be saved. Please try again.'); }
    finally { this.saving.set(false); }
  }

  /** Loads the current route poll and owns loading/not-found/error state. */
  async load(showSpinner = true): Promise<void> {
    if (!Number.isFinite(this.pollId)) { this.problem.set('Invalid poll id.'); this.busy.set(false); return; }
    if (showSpinner) this.busy.set(true);
    try { this.poll.set(await this.polls.open(this.pollId)); if (!this.poll()) this.problem.set('This poll does not exist.'); }
    catch (error) { console.error(error); this.problem.set('The poll could not be loaded.'); }
    finally { this.busy.set(false); }
  }

  /**
   * Reads the browser-only duplicate-vote marker defensively.
   * localStorage can be unavailable in restricted browser contexts.
   */
  private readVoteMarker(): boolean {
    try { return Boolean(localStorage.getItem(this.votedKey)); } catch { return false; }
  }
}
