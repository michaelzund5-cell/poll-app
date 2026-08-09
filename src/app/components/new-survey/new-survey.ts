/**
 * @file src/app/components/new-survey/new-survey.ts
 * @description Survey creation UI component.
 *
 * Owns reactive form state, dialog/popover interaction and user-facing validation. Persistence is delegated to SurveyService so this component remains focused on the creation workflow rather than database details.
 */

import { Component, ElementRef, HostListener, inject, output, signal, viewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
  SURVEY_CATEGORIES,
  SURVEY_LIMITS,
  SurveyCategory,
} from '../../features/surveys/constants/survey.constants';
import { CreateSurveyInput } from '../../features/surveys/models/survey.model';
import { SurveyService } from '../../features/surveys/services/survey.service';

/** How long success feedback remains visible before the dialog closes. */
const TOAST_DURATION_MS = 2_000;

/** Rejects values that only satisfy a length rule with whitespace. */
const trimmedMinLength = (minLength: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    return value.length >= minLength ? null : { trimmedMinLength: { minLength } };
  };

/** Rejects empty and whitespace-only answer values. */
const nonBlank: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  String(control.value ?? '').trim().length > 0 ? null : { blank: true };

@Component({
  selector: 'app-new-survey',
  imports: [ReactiveFormsModule],
  templateUrl: './new-survey.html',
  styleUrl: './new-survey.scss',
})
/**
 * Controls the complete survey-creation user workflow.
 *
 * Responsibilities kept here:
 * - reactive form state and validation;
 * - dialog/category/popover UI state;
 * - translating valid form values into CreateSurveyInput.
 *
 * Persistence is deliberately delegated to SurveyService so the component does not
 * know table names, DTOs or Supabase query details.
 */
export class NewSurvey {
  /** Notifies the parent that persistence completed successfully. */
  readonly surveyCreated = output<void>();
  readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('newSurveyDialog');
  readonly toastEl = viewChild<ElementRef<HTMLDivElement>>('toastEl');
  readonly publishBtn = viewChild<ElementRef<HTMLButtonElement>>('publishBtn');

  /** Reactive presentation state for the custom category dropdown. */
  readonly categoryOpen = signal(false);
  readonly isSaving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly categories = SURVEY_CATEGORIES;
  readonly limits = SURVEY_LIMITS;

  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly surveyService = inject(SurveyService);
  private toastTimer?: ReturnType<typeof setTimeout>;

  /**
   * Typed reactive-form root.
   * Dynamic questions/answers live in FormArrays because users can add/remove them.
   */
  readonly surveyForm = this.fb.group({
    surveyName: ['', [Validators.required, trimmedMinLength(5)]],
    endDate: [''],
    description: [''],
    category: ['', Validators.required],
    questions: this.fb.array([this.createQuestion()]),
  });

  /**
   * Convenience accessor for the dynamic question FormArray used by template and helpers.
   */
  get questions(): FormArray {
    return this.surveyForm.controls.questions;
  }

  /**
   * Clears stale save errors and opens the native modal dialog.
   */
  open(): void {
    this.saveError.set(null);
    this.dialogRef()?.nativeElement.showModal();
  }

  /**
   * Closes the native dialog; reset behavior is centralized in the close event handler.
   */
  close(): void {
    this.dialogRef()?.nativeElement.close();
  }

  /**
   * Positions success feedback relative to the publish button and opens the popover. DOM access is isolated to this browser-API-specific interaction.
   */
  showToast(): void {
    const toast = this.toastEl()?.nativeElement;
    const button = this.publishBtn()?.nativeElement;
    if (!toast || !button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    toast.style.top = `${rect.top}px`;
    toast.style.left = `${rect.left}px`;
    toast.showPopover();
  }

  /**
   * Closes success feedback when the timer or user flow completes.
   */
  hideToast(): void {
    this.toastEl()?.nativeElement.hidePopover();
  }

  /**
   * Restores the creation form to a deterministic initial state after any dialog close path.
   */
  onDialogClose(): void {
    this.categoryOpen.set(false);
    this.saveError.set(null);
    this.resetDynamicFields();
    this.surveyForm.reset();
    this.surveyForm.markAsUntouched();
  }

  /**
   * Toggles the custom category menu and marks the control touched when closing it so validation can become visible.
   */
  toggleCategory(): void {
    if (this.categoryOpen()) {
      this.surveyForm.controls.category.markAsTouched();
    }
    this.categoryOpen.update((open) => !open);
  }

  /**
   * Stores a type-safe category selection and closes the custom dropdown.
   */
  selectCategory(category: SurveyCategory): void {
    this.surveyForm.controls.category.setValue(category);
    this.categoryOpen.set(false);
  }

  /** Closes the custom dropdown when the user clicks anywhere outside it. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.categoryOpen()) return;
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.category-field')) {
      this.categoryOpen.set(false);
      this.surveyForm.controls.category.markAsTouched();
    }
  }

  /**
   * Factory for one answer form group. Centralizing creation guarantees new/reset answers use identical validators.
   */
  createAnswer() {
    return this.fb.group({
      answerText: ['', [Validators.required, nonBlank]],
    });
  }

  /**
   * Factory for one question group with the minimum two required answer controls.
   */
  createQuestion() {
    return this.fb.group({
      questionText: ['', [Validators.required, trimmedMinLength(5)]],
      allowMultiple: [false],
      answers: this.fb.array([this.createAnswer(), this.createAnswer()]),
    });
  }

  /**
   * Adds a question only while the configured domain maximum has not been reached.
   */
  addQuestion(): void {
    if (this.questions.length < SURVEY_LIMITS.maxQuestions) {
      this.questions.push(this.createQuestion());
    }
  }

  /**
   * Removes a dynamic question. The first group is reset instead of removed so the form always retains its required base structure.
   */
  removeQuestion(index: number): void {
    if (index === 0) {
      this.questions.at(0).reset();
      this.resetAnswersForFirstQuestion();
      return;
    }

    this.questions.removeAt(index);
  }

  /**
   * Returns the answer FormArray for a specific question so answer operations stay encapsulated.
   */
  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  /**
   * Adds an answer while respecting the centralized per-question maximum.
   */
  addAnswer(questionIndex: number): void {
    const answers = this.getAnswers(questionIndex);
    if (answers.length < SURVEY_LIMITS.maxAnswersPerQuestion) {
      answers.push(this.createAnswer());
    }
  }

  /**
   * Removes an answer while preserving the minimum answer count; at the minimum the control is cleared instead.
   */
  removeAnswer(questionIndex: number, answerIndex: number): void {
    const answers = this.getAnswers(questionIndex);

    if (answers.length <= SURVEY_LIMITS.minAnswersPerQuestion) {
      answers.at(answerIndex).reset();
      return;
    }

    answers.removeAt(answerIndex);
  }

  /**
   * Converts a zero-based answer index into A, B, C... labels used by the UI/persistence model.
   */
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Validates once, prevents duplicate submissions, delegates persistence and exposes user-facing success/error state.
   */
  async saveSurvey(): Promise<void> {
    this.surveyForm.markAllAsTouched();
    this.saveError.set(null);

    if (this.surveyForm.invalid || this.isSaving()) {
      return;
    }

    this.isSaving.set(true);

    try {
      await this.surveyService.create(this.toCreateSurveyInput());
      this.surveyCreated.emit();
      this.showSuccessAndClose();
    } catch (error) {
      console.error('Failed to create survey', error);
      this.saveError.set('The survey could not be published. Please try again.');
    } finally {
      this.isSaving.set(false);
    }
  }

  /**
   * Maps reactive-form values into the explicit application write model and trims user-entered text at the UI boundary.
   */
  private toCreateSurveyInput(): CreateSurveyInput {
    const value = this.surveyForm.getRawValue();

    return {
      title: value.surveyName.trim(),
      description: value.description.trim() || undefined,
      category: value.category as SurveyCategory,
      endDate: value.endDate || undefined,
      questions: value.questions.map((question) => ({
        text: question.questionText.trim(),
        allowMultiple: question.allowMultiple,
        answers: question.answers.map((answer) => ({ text: answer.answerText.trim() })),
      })),
    };
  }

  /**
   * Shows success feedback, replaces any previous timer and closes the dialog after a fixed delay.
   */
  private showSuccessAndClose(): void {
    this.showToast();
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.hideToast();
      this.close();
    }, TOAST_DURATION_MS);
  }

  /**
   * Collapses dynamic FormArrays back to one question before the form is reused.
   */
  private resetDynamicFields(): void {
    while (this.questions.length > 1) {
      this.questions.removeAt(this.questions.length - 1);
    }
    this.resetAnswersForFirstQuestion();
  }

  /**
   * Restores the first question to the domain-required minimum answer count.
   */
  private resetAnswersForFirstQuestion(): void {
    const answers = this.getAnswers(0);
    while (answers.length > SURVEY_LIMITS.minAnswersPerQuestion) {
      answers.removeAt(answers.length - 1);
    }
  }
}
