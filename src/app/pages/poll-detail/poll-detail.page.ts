/**
 * @file src/app/pages/poll-detail/poll-detail.page.ts
 * @description Survey detail, vote selection and live-result controller.
 */

import {
  Component,
  computed,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import {
  PollChoice,
  PollDetails,
  PollPrompt,
} from '../../domain/polls/poll.contracts';
import { isClosed } from '../../domain/polls/poll.rules';

@Component({
  selector: 'app-poll-detail-page',
  standalone: true,
  imports: [RouterLink],
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
  readonly feedback = signal<string | null>(
    this.route.snapshot.queryParamMap.get('created') === '1'
      ? 'Survey published successfully.'
      : null,
  );
  readonly alreadyVoted = signal(this.readVoteMarker());

  readonly locked = computed(
    () => this.alreadyVoted() || isClosed(this.poll()?.closesAt),
  );

  constructor() {
    void this.load();
    this.stopRealtime = this.polls.watchVotes(() => {
      void this.load(false);
    });
  }

  ngOnDestroy(): void {
    this.stopRealtime?.();
  }

  isSelected(questionId: number, answerId: number): boolean {
    return (this.selected()[questionId] ?? []).includes(answerId);
  }

  toggle(questionId: number, answerId: number, multiple: boolean): void {
    if (this.locked()) {
      return;
    }

    this.selected.update((current) => {
      const previous = current[questionId] ?? [];

      const next = multiple
        ? previous.includes(answerId)
          ? previous.filter((id) => id !== answerId)
          : [...previous, answerId]
        : [answerId];

      return { ...current, [questionId]: next };
    });
  }

  livePercentage(prompt: PollPrompt, choice: PollChoice): number {
    if (this.locked()) {
      return choice.percentage;
    }

    const selectedIds = this.selected()[prompt.id] ?? [];
    const previewVotes =
      choice.votes + (selectedIds.includes(choice.id) ? 1 : 0);
    const previewTotal = prompt.totalVotes + selectedIds.length;

    return previewTotal === 0
      ? 0
      : Math.round((previewVotes / previewTotal) * 100);
  }

  liveVotes(prompt: PollPrompt, choice: PollChoice): number {
    return choice.votes + (
      !this.locked() && this.isSelected(prompt.id, choice.id) ? 1 : 0
    );
  }

  canSubmit(): boolean {
    const current = this.poll();

    return Boolean(
      current &&
      current.prompts.length > 0 &&
      current.prompts.every(
        (prompt) => (this.selected()[prompt.id] ?? []).length > 0,
      ),
    );
  }

  async submitVote(): Promise<void> {
    if (!this.canSubmit() || this.locked() || this.saving()) {
      return;
    }

    this.saving.set(true);
    this.feedback.set(null);

    try {
      await this.polls.vote(Object.values(this.selected()).flat());
      this.writeVoteMarker();
      this.alreadyVoted.set(true);
      this.selected.set({});
      this.feedback.set('Vote saved. Live results were updated.');
      await this.load(false);
    } catch (error) {
      console.error('Vote submission failed', error);
      this.feedback.set('Your vote could not be saved.');
    } finally {
      this.saving.set(false);
    }
  }

  async load(showSpinner = true): Promise<void> {
    if (!Number.isFinite(this.pollId)) {
      this.problem.set('Invalid survey id.');
      this.busy.set(false);
      return;
    }

    if (showSpinner) {
      this.busy.set(true);
    }

    try {
      const current = await this.polls.open(this.pollId);
      this.poll.set(current);
      this.problem.set(current ? null : 'This survey does not exist.');
    } catch (error) {
      console.error('Survey loading failed', error);
      this.problem.set('The survey could not be loaded.');
    } finally {
      this.busy.set(false);
    }
  }

  formatDate(date?: Date): string {
    if (!date) {
      return 'No deadline';
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  private readVoteMarker(): boolean {
    try {
      return Boolean(localStorage.getItem(this.votedKey));
    } catch {
      return false;
    }
  }

  private writeVoteMarker(): void {
    try {
      localStorage.setItem(this.votedKey, new Date().toISOString());
    } catch {
      // Voting still succeeds if local browser storage is unavailable.
    }
  }
}


