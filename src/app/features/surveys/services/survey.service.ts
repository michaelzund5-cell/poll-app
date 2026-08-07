import { inject, Injectable } from '@angular/core';
import { SurveyRepository } from '../data-access/survey.repository';
import { mapSurvey, mapSurveyDetails } from '../data-access/survey.mapper';
import { Answer, CreateSurveyInput, Question, Survey, SurveyDetails } from '../models/survey.model';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private readonly repository = inject(SurveyRepository);

  async getAll(): Promise<Survey[]> {
    return (await this.repository.findAll()).map(mapSurvey);
  }

  async getById(id: number): Promise<SurveyDetails | null> {
    const dto = await this.repository.findById(id);
    return dto ? mapSurveyDetails(dto) : null;
  }

  create(input: CreateSurveyInput): Promise<number> {
    return this.repository.create(input);
  }

  saveVotes(questions: readonly Question[]): Promise<void> {
    const answerIds = questions.flatMap((question) =>
      question.answers.filter((answer) => answer.selected).map((answer) => answer.id),
    );

    return this.repository.createVotes(answerIds);
  }

  async withResults(questions: readonly Question[]): Promise<Question[]> {
    const answerIds = questions.flatMap((question) => question.answers.map((answer) => answer.id));
    const votes = await this.repository.findVotes(answerIds);

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
