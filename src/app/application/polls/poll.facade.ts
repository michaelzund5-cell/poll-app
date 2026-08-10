import { inject, Injectable } from '@angular/core';
import { POLL_CATEGORIES, PollCategory, PollDetails, PollDraft, PollSummary } from '../../domain/polls/poll.contracts';
import { SupabasePollStore } from '../../infrastructure/polls/supabase-poll.store';

const FALLBACK_CATEGORY: PollCategory = 'Lifestyle & Preferences';

@Injectable({ providedIn: 'root' })
export class PollFacade {
  private readonly store = inject(SupabasePollStore);

  async browse(): Promise<PollSummary[]> {
    return (await this.store.list()).map((row) => ({
      id: row.id,
      title: row.title,
      category: this.categoryOf(row.category),
      description: row.description ?? undefined,
      closesAt: row.end_date ? new Date(row.end_date) : undefined,
    }));
  }

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

  create(draft: PollDraft): Promise<number> {
    return this.store.create(draft);
  }

  vote(answerIds: number[]): Promise<void> {
    return this.store.recordVotes(answerIds);
  }

  private categoryOf(raw: string): PollCategory {
    const normalized = raw.trim();
    return (POLL_CATEGORIES as readonly string[]).includes(normalized)
      ? (normalized as PollCategory)
      : FALLBACK_CATEGORY;
  }
}
