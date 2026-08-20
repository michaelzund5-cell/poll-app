/**
 * @file src/app/application/polls/poll.facade.ts
 * @description Application use cases and persistence-to-domain mapping.
 */

import { inject, Injectable } from '@angular/core';
import {
  POLL_CATEGORIES,
  PollCategory,
  PollChoice,
  PollDetails,
  PollDraft,
  PollPrompt,
  PollSummary,
} from '../../domain/polls/poll.contracts';
import {
  AnswerRow,
  QuestionRow,
  SupabasePollStore,
  SurveyRow,
  VoteRow,
} from '../../infrastructure/polls/supabase-poll.store';

const FALLBACK_CATEGORY: PollCategory = 'Lifestyle & Preferences';

@Injectable({ providedIn: 'root' })
export class PollFacade {
  private readonly store = inject(SupabasePollStore);

  /**
   * Loads survey summaries for the overview.
   * @returns Domain-friendly survey summaries for the overview.
   */
  async browse(): Promise<PollSummary[]> {
    const rows = await this.store.list();
    return rows.map((row) => this.toSummary(row));
  }

  /**
   * Loads one survey and maps persisted votes to domain results.
   * @param id Survey id.
   * @returns Survey details with vote totals, or null when missing.
   */
  async open(id: number): Promise<PollDetails | null> {
    const row = await this.store.get(id);
    if (!row) return null;
    const questions = this.sortQuestions(row.questions);
    const votes = await this.store.votesFor(this.answerIds(questions));
    const votesByAnswer = this.countVotes(votes);
    return { ...this.toSummary(row), prompts: this.toPrompts(questions, votesByAnswer) };
  }

  /**
   * Creates a survey through the persistence adapter.
   * @param draft Valid survey draft.
   * @returns Id of the created survey.
   */
  create(draft: PollDraft): Promise<number> {
    return this.store.create(draft);
  }

  /**
   * Persists the selected survey answers.
   * @param answerIds Selected answer ids.
   * @returns Promise completed after persistence.
   */
  vote(answerIds: number[]): Promise<void> {
    return this.store.recordVotes(answerIds);
  }

  /**
   * Subscribes to realtime vote inserts.
   * @param onVoteInserted Callback for new votes.
   * @returns Realtime unsubscribe callback.
   */
  watchVotes(onVoteInserted: () => void): () => void {
    return this.store.watchVotes(onVoteInserted);
  }

  /**
   * Maps a persistence row to a domain survey summary.
   * @param row Persistence survey row.
   * @returns Domain survey summary.
   */
  private toSummary(row: SurveyRow): PollSummary {
    return {
      id: row.id,
      title: row.title,
      category: this.toCategory(row.category),
      description: row.description ?? undefined,
      closesAt: row.end_date ? new Date(row.end_date) : undefined,
    };
  }

  /**
   * Sorts persisted questions by their display position.
   * @param questions Question rows.
   * @returns Rows sorted by position.
   */
  private sortQuestions(questions: QuestionRow[]): QuestionRow[] {
    return [...questions].sort((left, right) => left.position - right.position);
  }

  /**
   * Collects all answer ids from the supplied questions.
   * @param questions Question rows.
   * @returns Flattened answer ids.
   */
  private answerIds(questions: QuestionRow[]): number[] {
    return questions.flatMap((question) => question.answers.map((answer) => answer.id));
  }

  /**
   * Counts persisted votes by answer id.
   * @param votes Persisted votes.
   * @returns Vote count keyed by answer id.
   */
  private countVotes(votes: VoteRow[]): Map<number, number> {
    const counts = new Map<number, number>();
    for (const vote of votes) {
      counts.set(vote.answer_id, (counts.get(vote.answer_id) ?? 0) + 1);
    }
    return counts;
  }

  /**
   * Maps persisted questions to domain prompts.
   * @param questions Question rows.
   * @param counts Vote counts.
   * @returns Domain prompts.
   */
  private toPrompts(questions: QuestionRow[], counts: Map<number, number>): PollPrompt[] {
    return questions.map((question) => this.toPrompt(question, counts));
  }

  /**
   * Maps one persisted question to a domain prompt.
   * @param question Question row.
   * @param counts Vote counts.
   * @returns Domain prompt.
   */
  private toPrompt(question: QuestionRow, counts: Map<number, number>): PollPrompt {
    const answers = [...question.answers].sort((a, b) => a.position - b.position);
    const totalVotes = answers.reduce((total, answer) => total + (counts.get(answer.id) ?? 0), 0);
    return {
      id: question.id,
      text: question.text,
      multiple: question.allow_multiple,
      totalVotes,
      choices: answers.map((answer) => this.toChoice(answer, counts, totalVotes)),
    };
  }

  /**
   * Maps one persisted answer to a domain choice.
   * @param answer Answer row.
   * @param counts Vote counts.
   * @param total Total prompt votes.
   * @returns Domain choice.
   */
  private toChoice(answer: AnswerRow, counts: Map<number, number>, total: number): PollChoice {
    const votes = counts.get(answer.id) ?? 0;
    return {
      id: answer.id,
      label: answer.label,
      text: answer.text,
      votes,
      percentage: total === 0 ? 0 : Math.round((votes / total) * 100),
    };
  }

  /**
   * Normalizes a stored category to a valid domain value.
   * @param rawCategory Stored category value.
   * @returns Valid domain category with fallback.
   */
  private toCategory(rawCategory: string): PollCategory {
    const normalized = rawCategory.trim();
    return (POLL_CATEGORIES as readonly string[]).includes(normalized)
      ? (normalized as PollCategory)
      : FALLBACK_CATEGORY;
  }
}
