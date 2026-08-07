import { Component, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SURVEY_CATEGORIES,
  SURVEY_LIMITS,
  SurveyCategory,
} from '../../features/surveys/constants/survey.constants';
import { CreateSurveyInput } from '../../features/surveys/models/survey.model';
import { SurveyService } from '../../features/surveys/services/survey.service';

const TOAST_DURATION_MS = 2_000;

@Component({
  selector: 'app-new-survey',
  imports: [ReactiveFormsModule],
  templateUrl: './new-survey.html',
  styleUrl: './new-survey.scss',
})
export class NewSurvey {
  readonly surveyCreated = output<void>();
  readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('newSurveyDialog');
  readonly toastEl = viewChild<ElementRef<HTMLDivElement>>('toastEl');
  readonly publishBtn = viewChild<ElementRef<HTMLButtonElement>>('publishBtn');

  readonly categoryOpen = signal(false);
  readonly isSaving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly categories = SURVEY_CATEGORIES;
  readonly limits = SURVEY_LIMITS;

  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly surveyService = inject(SurveyService);
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly surveyForm = this.fb.group({
    surveyName: ['', [Validators.required, Validators.minLength(5)]],
    endDate: [''],
    description: [''],
    category: ['', Validators.required],
    questions: this.fb.array([this.createQuestion()]),
  });

  get questions(): FormArray {
    return this.surveyForm.controls.questions;
  }

  open(): void {
    this.saveError.set(null);
    this.dialogRef()?.nativeElement.showModal();
  }

  close(): void {
    this.dialogRef()?.nativeElement.close();
  }

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

  hideToast(): void {
    this.toastEl()?.nativeElement.hidePopover();
  }

  onDialogClose(): void {
    this.categoryOpen.set(false);
    this.saveError.set(null);
    this.resetDynamicFields();
    this.surveyForm.reset();
    this.surveyForm.markAsUntouched();
  }

  toggleCategory(): void {
    if (this.categoryOpen()) {
      this.surveyForm.controls.category.markAsTouched();
    }
    this.categoryOpen.update((open) => !open);
  }

  selectCategory(category: SurveyCategory): void {
    this.surveyForm.controls.category.setValue(category);
    this.categoryOpen.set(false);
  }

  createAnswer() {
    return this.fb.group({
      answerText: ['', Validators.required],
    });
  }

  createQuestion() {
    return this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(5)]],
      allowMultiple: [false],
      answers: this.fb.array([this.createAnswer(), this.createAnswer()]),
    });
  }

  addQuestion(): void {
    if (this.questions.length < SURVEY_LIMITS.maxQuestions) {
      this.questions.push(this.createQuestion());
    }
  }

  removeQuestion(index: number): void {
    if (index === 0) {
      this.questions.at(0).reset();
      this.resetAnswersForFirstQuestion();
      return;
    }

    this.questions.removeAt(index);
  }

  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  addAnswer(questionIndex: number): void {
    const answers = this.getAnswers(questionIndex);
    if (answers.length < SURVEY_LIMITS.maxAnswersPerQuestion) {
      answers.push(this.createAnswer());
    }
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const answers = this.getAnswers(questionIndex);

    if (answers.length <= SURVEY_LIMITS.minAnswersPerQuestion) {
      answers.at(answerIndex).reset();
      return;
    }

    answers.removeAt(answerIndex);
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

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

  private showSuccessAndClose(): void {
    this.showToast();
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.hideToast();
      this.close();
    }, TOAST_DURATION_MS);
  }

  private resetDynamicFields(): void {
    while (this.questions.length > 1) {
      this.questions.removeAt(this.questions.length - 1);
    }
    this.resetAnswersForFirstQuestion();
  }

  private resetAnswersForFirstQuestion(): void {
    const answers = this.getAnswers(0);
    while (answers.length > SURVEY_LIMITS.minAnswersPerQuestion) {
      answers.removeAt(answers.length - 1);
    }
  }
}
