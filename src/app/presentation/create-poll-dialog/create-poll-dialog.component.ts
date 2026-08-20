/**
 * @file src/app/presentation/create-poll-dialog/create-poll-dialog.component.ts
 * @description Reactive survey creation modal and presentation state.
 */

import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import {
  POLL_CATEGORIES,
  PollCategory,
  PollDraft,
  PollDraftChoice,
  PollDraftPrompt,
} from '../../domain/polls/poll.contracts';
import { meaningfulText, normalizeText, POLL_LIMITS } from '../../domain/polls/poll.rules';
import { CreatePollDialogService } from './create-poll-dialog.service';

@Component({
  selector: 'app-create-poll-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-poll-dialog.component.html',
  styleUrl: './create-poll-dialog.component.scss',
})
export class CreatePollDialogComponent {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly polls = inject(PollFacade);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly dialog = inject(CreatePollDialogService);
  readonly categories = POLL_CATEGORIES;
  readonly limits = POLL_LIMITS;
  readonly saving = signal(false);
  readonly submitMessage = signal<string | null>(null);
  readonly categoryMenuOpen = signal(false);
  readonly descriptionLimitReached = signal(false);
  readonly minDeadline = new Date().toISOString().slice(0, 10);

  readonly form = this.formBuilder.group({
    title: ['', [meaningfulText(5)]],
    category: ['' as PollCategory | ''],
    closesAt: [''],
    description: [''],
    prompts: this.formBuilder.array([this.createQuestionGroup()]),
  });

  /**
   * Exposes the dynamic question form array.
   * @returns Form array containing all survey questions.
   */
  get prompts(): FormArray {
    return this.form.controls.prompts;
  }

  /**
   * Returns the answer form array for a specific question.
   * @param questionIndex Question index.
   * @returns Answer form array for the question.
   */
  choicesAt(questionIndex: number): FormArray {
    return this.prompts.at(questionIndex).get('choices') as FormArray;
  }

  /** Adds a question while respecting the configured maximum. */
  addQuestion(): void {
    if (this.prompts.length < POLL_LIMITS.maximumPrompts) {
      this.prompts.push(this.createQuestionGroup());
    }
  }

  /**
   * Removes or resets a question while preserving the minimum structure.
   * @param index Question index to remove or reset.
   */
  removeQuestion(index: number): void {
    if (this.prompts.length === 1) {
      this.prompts.at(0).reset({ text: '', multiple: false });
      return;
    }
    this.prompts.removeAt(index);
  }

  /**
   * Adds an answer while respecting the configured maximum.
   * @param questionIndex Question receiving a new answer.
   */
  addAnswer(questionIndex: number): void {
    const choices = this.choicesAt(questionIndex);
    if (choices.length < POLL_LIMITS.maximumChoices) {
      choices.push(this.createAnswerGroup());
    }
  }

  /**
   * Removes or resets an answer while preserving the minimum count.
   * @param questionIndex Parent question index.
   * @param answerIndex Answer index to remove or reset.
   */
  removeAnswer(questionIndex: number, answerIndex: number): void {
    const choices = this.choicesAt(questionIndex);
    if (choices.length <= POLL_LIMITS.minimumChoices) {
      choices.at(answerIndex).reset({ text: '' });
      return;
    }
    choices.removeAt(answerIndex);
  }

  /**
   * Creates the alphabetic label used for an answer.
   * @param index Zero-based answer index.
   * @returns Alphabetic answer label.
   */
  answerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /** Toggles the custom category menu. */
  toggleCategoryMenu(): void {
    this.categoryMenuOpen.update((open) => !open);
  }

  /** Closes the custom category menu. */
  closeCategoryMenu(): void {
    this.categoryMenuOpen.set(false);
  }

  /**
   * Applies the selected category to the form.
   * @param category Selected category or empty placeholder value.
   */
  selectCategory(category: PollCategory | ''): void {
    this.form.controls.category.setValue(category);
    this.form.controls.category.markAsTouched();
    this.categoryMenuOpen.set(false);
  }

  /**
   * Closes the category menu when a document click occurs outside the trigger.
   * @param event Document click used to detect clicks outside the category control.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.categoryMenuOpen()) return;
    const trigger = this.host.nativeElement.querySelector('.category-trigger');
    if (trigger && !trigger.contains(event.target as Node)) {
      this.categoryMenuOpen.set(false);
    }
  }

  /**
   * Checks whether validation feedback should be displayed.
   * @param control Minimal control state.
   * @returns Whether validation feedback should be visible.
   */
  controlInvalid(control: { invalid: boolean; touched: boolean }): boolean {
    return control.invalid && control.touched;
  }

  /**
   * Clears a top-level form field from its trash action.
   * @param field Optional or top-level field to clear.
   */
  clearField(field: 'title' | 'description' | 'closesAt'): void {
    this.form.controls[field].setValue('');
    this.form.controls[field].markAsPristine();
    if (field === 'description') this.descriptionLimitReached.set(false);
  }

  /**
   * Detects an attempt to type past the description limit.
   * @param event Before-input event used to reveal feedback only after an overflow attempt.
   */
  onDescriptionBeforeInput(event: Event): void {
    const inputEvent = event as InputEvent;
    if (!inputEvent.inputType.startsWith('insert')) return;
    const target = event.target as HTMLTextAreaElement;
    const replacingText = target.selectionStart !== target.selectionEnd;
    if (target.value.length >= POLL_LIMITS.maximumDescriptionLength && !replacingText) {
      this.descriptionLimitReached.set(true);
    }
  }

  /** Hides the description limit warning again when the value is below the limit. */
  syncDescriptionLimitMessage(): void {
    const length = this.form.controls.description.value.length;
    if (length < POLL_LIMITS.maximumDescriptionLength) {
      this.descriptionLimitReached.set(false);
    }
  }

  /** Closes the dialog unless a survey is currently being saved. */
  close(): void {
    if (!this.saving()) this.dialog.close();
  }

  /**
   * Closes the dialog when the backdrop itself is clicked.
   * @param event Backdrop click event.
   */
  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  /**
   * Validates, persists and opens the created survey.
   * @returns Promise completed after submission.
   */
  async submit(): Promise<void> {
    this.prepareSubmit();
    if (!this.canSubmit()) return;
    this.saving.set(true);
    try {
      await this.publishSurvey();
    } catch (error) {
      this.handleSubmitError(error);
    } finally {
      this.saving.set(false);
    }
  }

  /** Marks the form and clears stale submission feedback. */
  private prepareSubmit(): void {
    this.form.markAllAsTouched();
    this.submitMessage.set(null);
  }

  /**
   * Checks whether the current form state can be submitted.
   * @returns Whether the form is valid and no save operation is active.
   */
  private canSubmit(): boolean {
    if (this.saving()) return false;
    if (!this.form.invalid && this.form.controls.category.value) return true;
    this.submitMessage.set('Please complete the required survey name, category, question and answers.');
    return false;
  }

  /**
   * Creates the survey, resets the form and navigates to its detail page.
   * @returns Promise completed after navigation.
   */
  private async publishSurvey(): Promise<void> {
    const id = await this.polls.create(this.toDraft());
    this.dialog.close();
    this.resetForm();
    await this.router.navigate(['/poll', id], { queryParams: { created: '1' } });
  }

  /**
   * Logs a survey creation failure and exposes user feedback.
   * @param error Survey creation failure.
   */
  private handleSubmitError(error: unknown): void {
    console.error('Survey creation failed', error);
    this.submitMessage.set('The survey could not be published.');
  }

  /**
   * Creates a new answer form group.
   * @returns New answer form group.
   */
  private createAnswerGroup() {
    return this.formBuilder.group({ text: ['', [meaningfulText(1)]] });
  }

  /**
   * Creates a new question form group.
   * @returns New question form group with two answer fields.
   */
  private createQuestionGroup() {
    return this.formBuilder.group({
      text: ['', [meaningfulText(5)]],
      multiple: [false],
      choices: this.formBuilder.array([this.createAnswerGroup(), this.createAnswerGroup()]),
    });
  }

  /**
   * Maps current form values to a normalized domain draft.
   * @returns Normalized domain draft from current form values.
   */
  private toDraft(): PollDraft {
    const raw = this.form.getRawValue();
    return {
      title: normalizeText(raw.title),
      category: raw.category as PollCategory,
      description: normalizeText(raw.description) || undefined,
      closesAt: raw.closesAt || undefined,
      prompts: raw.prompts.map((prompt) => this.toPromptDraft(prompt)),
    };
  }

  /**
   * Maps one raw prompt value to a normalized domain prompt.
   * @param prompt Raw prompt form value.
   * @returns Normalized prompt draft.
   */
  private toPromptDraft(prompt: { text: string; multiple: boolean; choices: { text: string }[] }): PollDraftPrompt {
    return {
      text: normalizeText(prompt.text),
      multiple: prompt.multiple,
      choices: prompt.choices.map((choice) => this.toChoiceDraft(choice)),
    };
  }

  /**
   * Maps one raw answer value to a normalized domain answer.
   * @param choice Raw answer form value.
   * @returns Normalized answer draft.
   */
  private toChoiceDraft(choice: { text: string }): PollDraftChoice {
    return { text: normalizeText(choice.text) };
  }

  /** Restores the creation form to one empty question with two answers. */
  private resetForm(): void {
    this.removeExtraQuestions();
    this.form.reset();
    this.prompts.at(0).reset({ text: '', multiple: false });
    this.resetFirstQuestionChoices();
    this.descriptionLimitReached.set(false);
  }

  /** Removes all question groups except the first one. */
  private removeExtraQuestions(): void {
    while (this.prompts.length > 1) {
      this.prompts.removeAt(this.prompts.length - 1);
    }
  }

  /** Restores the first question to the configured minimum answer count. */
  private resetFirstQuestionChoices(): void {
    const choices = this.choicesAt(0);
    while (choices.length > POLL_LIMITS.minimumChoices) {
      choices.removeAt(choices.length - 1);
    }
    for (const choice of choices.controls) choice.reset({ text: '' });
  }
}
