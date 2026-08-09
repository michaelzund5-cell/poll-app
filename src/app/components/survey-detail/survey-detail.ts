/**
 * @file src/app/components/survey-detail/survey-detail.ts
 * @description Survey participation and result page.
 *
 * Loads a survey by route id, manages answer selection, submits votes and refreshes calculated results. Data access is delegated to SurveyService and local UI state is represented with signals.
 */

import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Answer, Question, Survey } from '../../features/surveys/models/survey.model';
import { SurveyService } from '../../features/surveys/services/survey.service';
import { isSurveyPast } from '../../features/surveys/utils/survey-date.util';
import { NewSurvey } from '../new-survey/new-survey';

@Component({
  selector: 'app-survey-detail',
  imports: [NewSurvey, RouterLink, DatePipe],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss',
})
/**
 * Page controller for participating in a survey and viewing its results.
 *
 * Route parsing, UI selection state and submit/load orchestration live here; data
 * retrieval, persistence and vote aggregation are delegated to SurveyService.
 */
export class SurveyDetail {
  readonly newSurveyDialog = viewChild(NewSurvey);
  readonly survey = signal<Survey | null>(null);
  readonly questions = signal<Question[]>([]);
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isPast = computed(() => isSurveyPast(this.survey()?.endDate));
  readonly hasVoted = signal(false);
  readonly voteFeedback = signal<string | null>(null);
  readonly canSubmit = computed(() =>
    !this.isPast() && !this.hasVoted() && this.questions().length > 0 &&
    this.questions().every((question) => question.answers.some((answer) => answer.selected)),
  );

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly surveyService = inject(SurveyService);

  /**
   * Starts the initial load immediately when the routed component is created.
   */
  constructor() {
    void this.loadSurvey();
  }

  /**
   * Opens the reusable survey-creation dialog from the detail page.
   */
  openDialog(): void {
    this.newSurveyDialog()?.open();
  }

  /**
   * Updates answer selection immutably. Single-choice and multi-choice behavior are resolved by a dedicated helper.
   */
  toggleAnswer(questionId: number, answerId: number): void {
    if (this.isPast() || this.hasVoted()) return;

    this.questions.update((questions) =>
      questions.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        const answers = question.answers.map((answer) =>
          this.toggleSelectedAnswer(question, answer, answerId),
        );

        return { ...question, answers };
      }),
    );
  }

  /**
   * Prevents submissions for expired/in-flight surveys, saves selected votes and refreshes derived results.
   */
  async completeSurvey(): Promise<void> {
    if (!this.canSubmit() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      await this.surveyService.saveVotes(this.questions());
      await this.loadResults();
      const surveyId = this.survey()?.id;
      if (surveyId) {
        localStorage.setItem(this.voteStorageKey(surveyId), 'true');
        this.hasVoted.set(true);
      }
      this.voteFeedback.set('Thank you! Your vote has been submitted and the live results are updated.');
    } catch (error) {
      console.error('Failed to submit survey', error);
      this.errorMessage.set('Your answers could not be saved. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /**
   * Validates the route id, loads the full survey model, splits page/survey state and then loads current results.
   */
  private async loadSurvey(): Promise<void> {
    const surveyId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(surveyId) || surveyId <= 0) {
      await this.navigateToNotFound();
      return;
    }

    try {
      const details = await this.surveyService.getById(surveyId);
      if (!details) {
        await this.navigateToNotFound();
        return;
      }

      const { questions, ...survey } = details;
      this.survey.set(survey);
      this.hasVoted.set(localStorage.getItem(this.voteStorageKey(survey.id)) === 'true');
      if (this.hasVoted()) this.voteFeedback.set('You have already completed this survey.');
      this.questions.set([...questions]);
      await this.loadResults();
    } catch (error) {
      console.error('Failed to load survey', error);
      this.errorMessage.set('This survey could not be loaded.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Replaces question state with a result-enriched immutable copy from SurveyService.
   */
  private async loadResults(): Promise<void> {
    this.questions.set(await this.surveyService.withResults(this.questions()));
  }

  /**
   * Applies the selection rule for one answer. Multi-select toggles only the target; single-select also clears siblings.
   */
  private toggleSelectedAnswer(question: Question, answer: Answer, answerId: number): Answer {
    if (question.allowMultiple) {
      return answer.id === answerId ? { ...answer, selected: !answer.selected } : answer;
    }

    return {
      ...answer,
      selected: answer.id === answerId ? !answer.selected : false,
    };
  }

  /**
   * Routes invalid/missing survey states to the dedicated not-found page without exposing an artificial URL.
   */
  private voteStorageKey(surveyId: number): string {
    return `poll-app:voted:${surveyId}`;
  }

  private navigateToNotFound(): Promise<boolean> {
    return this.router.navigateByUrl('/not-found', { skipLocationChange: true });
  }
}
