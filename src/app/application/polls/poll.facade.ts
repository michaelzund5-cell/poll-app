/**
 * @file src/app/application/polls/poll.facade.ts
 * @description Application use cases and persistence-to-domain mapping.
 */

import { inject, Injectable } from '@angular/core';
import {
  POLL_CATEGORIES,
  PollCategory,
  PollDetails,
  PollDraft,
  PollSummary,
} from '../../domain/polls/poll.contracts';
import { SupabasePollStore } from '../../infrastructure/polls/supabase-poll.store';

const FALLBACK_CATEGORY: PollCategory = 'Lifestyle & Preferences';

@Injectable({ providedIn: 'root' })
export class PollFacade {
  private readonly store = inject(SupabasePollStore);

  /** Loads domain-friendly summaries for the home screen. */
  async browse(): Promise<PollSummary[]> {
    const rows = await this.store.list();

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: this.toCategory(row.category),
      description: row.description ?? undefined,
      closesAt: row.end_date ? new Date(row.end_date) : undefined,
    }));
  }

  /** Loads one survey and calculates current vote totals/percentages. */
  async open(id: number): Promise<PollDetails | null> {
    const row = await this.store.get(id);

    if (!row) {
      return null;
    }

    const questions = [...row.questions].sort(
      (left, right) => left.position - right.position,
    );
    const answerIds = questions.flatMap((question) =>
      question.answers.map((answer) => answer.id),
    );
    const votes = await this.store.votesFor(answerIds);

    const votesByAnswer = new Map<number, number>();

    for (const vote of votes) {
      votesByAnswer.set(
        vote.answer_id,
        (votesByAnswer.get(vote.answer_id) ?? 0) + 1,
      );
    }

    return {
      id: row.id,
      title: row.title,
      category: this.toCategory(row.category),
      description: row.description ?? undefined,
      closesAt: row.end_date ? new Date(row.end_date) : undefined,
      prompts: questions.map((question) => {
        const choices = [...question.answers].sort(
          (left, right) => left.position - right.position,
        );

        const totalVotes = choices.reduce(
          (total, answer) => total + (votesByAnswer.get(answer.id) ?? 0),
          0,
        );

        return {
          id: question.id,
          text: question.text,
          multiple: question.allow_multiple,
          totalVotes,
          choices: choices.map((answer) => {
            const votesForAnswer = votesByAnswer.get(answer.id) ?? 0;

            return {
              id: answer.id,
              label: answer.label,
              text: answer.text,
              votes: votesForAnswer,
              percentage:
                totalVotes === 0
                  ? 0
                  : Math.round((votesForAnswer / totalVotes) * 100),
            };
          }),
        };
      }),
    };
  }

  create(draft: PollDraft): Promise<number> {
    return this.store.create(draft);
  }

  vote(answerIds: number[]): Promise<void> {
    return this.store.recordVotes(answerIds);
  }

  watchVotes(onVoteInserted: () => void): () => void {
    return this.store.watchVotes(onVoteInserted);
  }

  private toCategory(rawCategory: string): PollCategory {
    const normalized = rawCategory.trim();

    return (POLL_CATEGORIES as readonly string[]).includes(normalized)
      ? (normalized as PollCategory)
      : FALLBACK_CATEGORY;
  }
}


