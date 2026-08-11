/**
 * @file src/app/application/polls/poll.facade.ts
 * @description Poll application facade.
 *
 * Coordinates poll use cases and converts persistence data into domain models. Pages depend on this facade instead of talking to Supabase directly.
 */

import { inject, Injectable } from '@angular/core';
import { POLL_CATEGORIES, PollCategory, PollDetails, PollDraft, PollSummary } from '../../domain/polls/poll.contracts';
import { SupabasePollStore } from '../../infrastructure/polls/supabase-poll.store';

const FALLBACK_CATEGORY: PollCategory = 'Lifestyle & Preferences';

@Injectable({ providedIn: 'root' })
/**
 * Application boundary for poll-related use cases.
 *
 * Route components use this facade instead of accessing persistence directly.
 * It maps database-shaped records into domain models and coordinates browsing,
 * opening, creating and voting.
 */
export class PollFacade {
  private readonly store = inject(SupabasePollStore);

  /**
   * Loads lightweight poll summaries for list rendering.
   * Persistence column names are translated into domain terminology here.
   */
  async browse(): Promise<PollSummary[]> {
    return (await this.store.list()).map((row) => ({
      id: row.id,
      title: row.title,
      category: this.categoryOf(row.category),
      description: row.description ?? undefined,
      closesAt: row.end_date ? new Date(row.end_date) : undefined,
    }));
  }

  /**
   * Loads one complete poll and derives vote totals and percentages.
   *
   * Result aggregation belongs here because it is application data and should
   * not be coupled to either the page template or Supabase-specific row types.
   */
  async open(id: number): Promise<PollDetails | null> {
    const row = await this.store.get(id);
    if (!row) return null;

    const orderedQuestions = [...row.questions].sort((left, right) => left.position - right.position);
    const answerIds = orderedQuestions.flatMap((question) => question.answers.map((answer) => answer.id));
    const votes = await this.store.votesFor(answerIds);
    const countByAnswer = new Map<number, number>();
    votes.forEach((vote) => countByAnswer.set(vote.answer_id, (countByAnswer.get(vote.answer_id) ?? 0) + 1));

    return {
      id: row.id,
      title: row.title,
      category: this.categoryOf(row.category),
      description: row.description ?? undefined,
      closesAt: row.end_date ? new Date(row.end_date) : undefined,
      prompts: orderedQuestions.map((question) => {
        const orderedChoices = [...question.answers].sort((left, right) => left.position - right.position);
        const totalVotes = orderedChoices.reduce((sum, answer) => sum + (countByAnswer.get(answer.id) ?? 0), 0);
        return {
          id: question.id,
          text: question.text,
          multiple: question.allow_multiple,
          totalVotes,
          choices: orderedChoices.map((answer) => {
            const answerVotes = countByAnswer.get(answer.id) ?? 0;
            return {
              id: answer.id,
              label: answer.label,
              text: answer.text,
              votes: answerVotes,
              percentage: totalVotes === 0 ? 0 : Math.round((answerVotes / totalVotes) * 100),
            };
          }),
        };
      }),
    };
  }

  /** Persists a validated domain draft and returns the created poll id. */
  create(draft: PollDraft): Promise<number> {
    return this.store.create(draft);
  }

  /** Records the selected answer ids as votes. */
  vote(answerIds: number[]): Promise<void> {
    return this.store.recordVotes(answerIds);
  }

  /**
   * Converts persisted category text into a known domain category.
   * Unknown values use a safe fallback so malformed data cannot break rendering.
   */
  private categoryOf(raw: string): PollCategory {
    const normalized = raw.trim();
    return (POLL_CATEGORIES as readonly string[]).includes(normalized)
      ? (normalized as PollCategory)
      : FALLBACK_CATEGORY;
  }
}
