/**
 * @file src/app/features/surveys/services/survey.service.ts
 * @description Survey application/domain service.
 *
 * Provides use-case-oriented operations to components, coordinates repository calls and performs result aggregation. It separates business behavior from persistence mechanics and UI state.
 */

import { inject, Injectable } from '@angular/core';
import { SurveyRepository } from '../data-access/survey.repository';
import { mapSurvey, mapSurveyDetails } from '../data-access/survey.mapper';
import { Answer, CreateSurveyInput, Question, Survey, SurveyDetails } from '../models/survey.model';

@Injectable({ providedIn: 'root' })
/**
 * Application service for survey use cases.
 *
 * Components call this service for intent-level operations. Persistence details stay
 * in SurveyRepository, while transformations/aggregation stay in this layer or mapper.
 */
export class SurveyService {
  private readonly repository = inject(SurveyRepository);

  /**
   * Returns all surveys as domain models, hiding DTO conversion from callers.
   */
  async getAll(): Promise<Survey[]> {
    return (await this.repository.findAll()).map(mapSurvey);
  }

  /**
   * Returns a mapped survey detail model or null when the repository reports no matching row.
   */
  async getById(id: number): Promise<SurveyDetails | null> {
    const dto = await this.repository.findById(id);
    return dto ? mapSurveyDetails(dto) : null;
  }

  /**
   * Creates a complete survey aggregate and returns its persisted identifier.
   */
  create(input: CreateSurveyInput): Promise<number> {
    return this.repository.create(input);
  }

  /**
   * Extracts only currently selected answers from UI state before delegating persistence.
   */
  saveVotes(questions: readonly Question[]): Promise<void> {
    const answerIds = questions.flatMap((question) =>
      question.answers.filter((answer) => answer.selected).map((answer) => answer.id),
    );

    return this.repository.createVotes(answerIds);
  }

  /**
   * Enriches questions with vote totals and percentages without mutating the input array. Results remain derived state.
   */
  async withResults(questions: readonly Question[]): Promise<Question[]> {
    const answerIds = questions.flatMap((question) => question.answers.map((answer) => answer.id));
    const votes = await this.repository.findVotes(answerIds);

    // Aggregate once by answer id so percentage calculation below is O(answers + votes)
    // instead of repeatedly scanning the full vote collection for every answer.
    const voteCounts = new Map<number, number>();
    for (const vote of votes) {
      voteCounts.set(vote.answer_id, (voteCounts.get(vote.answer_id) ?? 0) + 1);
    }

    return questions.map((question) => {
      const totalVotes = question.answers.reduce(
        (sum, answer) => sum + (voteCounts.get(answer.id) ?? 0),
        0,
      );

      const answers: Answer[] = question.answers.map((answer) => ({
        ...answer,
        votePercentage:
          totalVotes > 0 ? Math.round(((voteCounts.get(answer.id) ?? 0) / totalVotes) * 100) : 0,
      }));

      return { ...question, answers, totalVotes };
    });
  }
}
