/**
 * @file src/app/pages/create-poll/create-poll.page.ts
 * @description Create-poll page controller.
 *
 * Builds and validates the reactive form, converts valid form state into a PollDraft and delegates persistence to the application facade.
 */

import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import { POLL_CATEGORIES, PollCategory, PollDraft } from '../../domain/polls/poll.contracts';
import { meaningfulText, normalizeText, POLL_LIMITS } from '../../domain/polls/poll.rules';

@Component({
  selector: 'app-create-poll-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-poll.page.html',
  styleUrl: './create-poll.page.scss',
})
/**
 * Route controller for creating polls.
 *
 * Reactive Forms own editable state and validation. Only valid normalized data
 * is converted into a domain draft and sent to the application facade.
 */
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

  get prompts(): FormArray { return this.form.controls.prompts; }
  choicesAt(promptIndex: number): FormArray { return this.prompts.at(promptIndex).get('choices') as FormArray; }

  /** Adds a question while respecting the configured maximum. */
  addPrompt(): void {
    if (this.prompts.length < POLL_LIMITS.maximumPrompts) this.prompts.push(this.newPrompt());
  }

  /**
   * Removes a question while preserving one minimum form block.
   * The final question is reset rather than removing the form structure.
   */
  removePrompt(index: number): void {
    if (this.prompts.length === 1) { this.prompts.at(0).reset({ text: '', multiple: false }); return; }
    this.prompts.removeAt(index);
  }

  /** Adds an answer option if the question has not reached its maximum. */
  addChoice(promptIndex: number): void {
    const choices = this.choicesAt(promptIndex);
    if (choices.length < POLL_LIMITS.maximumChoices) choices.push(this.newChoice());
  }

  /**
   * Removes an answer while preserving the minimum required answer count.
   * At the minimum, the selected answer field is cleared instead.
   */
  removeChoice(promptIndex: number, choiceIndex: number): void {
    const choices = this.choicesAt(promptIndex);
    if (choices.length <= POLL_LIMITS.minimumChoices) { choices.at(choiceIndex).reset({ text: '' }); return; }
    choices.removeAt(choiceIndex);
  }

  answerLabel(index: number): string { return String.fromCharCode(65 + index); }
  controlInvalid(control: { invalid: boolean; touched: boolean }): boolean { return control.invalid && control.touched; }

  /**
   * Marks validation state, publishes a valid draft and navigates to the new poll.
   */
  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    this.submitMessage.set(null);
    if (this.form.invalid || !this.form.controls.category.value || this.saving()) return;

    this.saving.set(true);
    try {
      const id = await this.polls.create(this.toDraft());
      await this.router.navigate(['/poll', id], { queryParams: { created: '1' } });
    } catch (error) {
      console.error(error);
      this.submitMessage.set('The poll could not be published. Please try again.');
    } finally { this.saving.set(false); }
  }

  private newChoice() { return this.forms.group({ text: ['', [meaningfulText(1)]] }); }
  private newPrompt() {
    return this.forms.group({
      text: ['', [meaningfulText(5)]],
      multiple: [false],
      choices: this.forms.array([this.newChoice(), this.newChoice()]),
    });
  }

  /**
   * Maps Angular form values to the domain draft.
   * Form-specific structures never leak into application or persistence code.
   */
  private toDraft(): PollDraft {
    const raw = this.form.getRawValue();
    return {
      title: normalizeText(raw.title),
      category: raw.category as PollCategory,
      description: normalizeText(raw.description) || undefined,
      closesAt: raw.closesAt || undefined,
      prompts: raw.prompts.map((prompt) => ({
        text: normalizeText(prompt.text),
        multiple: prompt.multiple,
        choices: prompt.choices.map((choice) => ({ text: normalizeText(choice.text) })),
      })),
    };
  }
}


