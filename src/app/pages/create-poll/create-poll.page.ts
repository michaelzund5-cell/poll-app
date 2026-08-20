/**
 * @file src/app/pages/create-poll/create-poll.page.ts
 * @description Legacy route controller for creating polls with Reactive Forms.
 */

import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-create-poll-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-poll.page.html',
  styleUrl: './create-poll.page.scss',
})
export class CreatePollPage {
  private readonly forms = inject(FormBuilder).nonNullable;
  private readonly polls = inject(PollFacade);
  private readonly router = inject(Router);

  readonly categories = POLL_CATEGORIES;
  readonly limits = POLL_LIMITS;
  readonly saving = signal(false);
  readonly submitMessage = signal<string | null>(null);

  readonly form = this.forms.group({
    title: ['', [meaningfulText(5)]],
    category: ['' as PollCategory | ''],
    closesAt: [''],
    description: [''],
    prompts: this.forms.array([this.newPrompt()]),
  });

  /**
   * Exposes the dynamic question form array.
   * @returns Form array containing all prompt groups.
   */
  get prompts(): FormArray {
    return this.form.controls.prompts;
  }

  /**
   * Returns the answer form array for a specific question.
   * @param promptIndex Prompt index.
   * @returns Answer form array for the prompt.
   */
  choicesAt(promptIndex: number): FormArray {
    return this.prompts.at(promptIndex).get('choices') as FormArray;
  }

  /** Adds a prompt while respecting the configured maximum. */
  addPrompt(): void {
    if (this.prompts.length < POLL_LIMITS.maximumPrompts) {
      this.prompts.push(this.newPrompt());
    }
  }

  /**
   * Removes or resets a prompt while preserving the minimum structure.
   * @param index Prompt index to remove or reset.
   */
  removePrompt(index: number): void {
    if (this.prompts.length === 1) {
      this.prompts.at(0).reset({ text: '', multiple: false });
      return;
    }
    this.prompts.removeAt(index);
  }

  /**
   * Adds an answer while respecting the configured maximum.
   * @param promptIndex Prompt receiving a new answer.
   */
  addChoice(promptIndex: number): void {
    const choices = this.choicesAt(promptIndex);
    if (choices.length < POLL_LIMITS.maximumChoices) choices.push(this.newChoice());
  }

  /**
   * Removes or resets an answer while preserving the minimum count.
   * @param promptIndex Parent prompt index.
   * @param choiceIndex Answer index to remove or reset.
   */
  removeChoice(promptIndex: number, choiceIndex: number): void {
    const choices = this.choicesAt(promptIndex);
    if (choices.length <= POLL_LIMITS.minimumChoices) {
      choices.at(choiceIndex).reset({ text: '' });
      return;
    }
    choices.removeAt(choiceIndex);
  }

  /**
   * Creates the alphabetic label used for an answer.
   * @param index Zero-based answer index.
   * @returns Alphabetic answer label.
   */
  answerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Checks whether validation feedback should be displayed.
   * @param control Minimal control state.
   * @returns Whether validation feedback should be shown.
   */
  controlInvalid(control: { invalid: boolean; touched: boolean }): boolean {
    return control.invalid && control.touched;
  }

  /**
   * Validates, persists and opens the created poll.
   * @returns Promise completed after submission.
   */
  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    this.submitMessage.set(null);
    if (!this.canSubmit()) return;
    this.saving.set(true);
    try {
      await this.publish();
    } catch (error) {
      this.handleSubmitError(error);
    } finally {
      this.saving.set(false);
    }
  }

  /**
   * Checks whether the current form state can be submitted.
   * @returns Whether the form is valid and not currently saving.
   */
  private canSubmit(): boolean {
    return !this.form.invalid && Boolean(this.form.controls.category.value) && !this.saving();
  }

  /**
   * Creates the poll and navigates to the detail page.
   * @returns Promise completed after navigation.
   */
  private async publish(): Promise<void> {
    const id = await this.polls.create(this.toDraft());
    await this.router.navigate(['/poll', id], { queryParams: { created: '1' } });
  }

  /**
   * Logs a survey creation failure and exposes user feedback.
   * @param error Survey creation failure.
   */
  private handleSubmitError(error: unknown): void {
    console.error('Survey creation failed', error);
    this.submitMessage.set('The poll could not be published. Please try again.');
  }

  /**
   * Creates a new answer form group.
   * @returns New answer form group.
   */
  private newChoice() {
    return this.forms.group({ text: ['', [meaningfulText(1)]] });
  }

  /**
   * Creates a new question form group.
   * @returns New prompt form group with two answers.
   */
  private newPrompt() {
    return this.forms.group({
      text: ['', [meaningfulText(5)]],
      multiple: [false],
      choices: this.forms.array([this.newChoice(), this.newChoice()]),
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
}
