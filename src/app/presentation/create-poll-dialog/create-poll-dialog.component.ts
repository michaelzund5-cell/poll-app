/**
 * @file src/app/presentation/create-poll-dialog/create-poll-dialog.component.ts
 * @description Reactive survey creation modal.
 *
 * User Story 3 requires an overlay instead of a dedicated route. This component
 * owns only form/presentation state; database persistence stays in PollFacade.
 */

import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PollFacade } from '../../application/polls/poll.facade';
import {
  POLL_CATEGORIES,
  PollCategory,
  PollDraft,
} from '../../domain/polls/poll.contracts';
import {
  meaningfulText,
  normalizeText,
  POLL_LIMITS,
} from '../../domain/polls/poll.rules';
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

  readonly dialog = inject(CreatePollDialogService);
  readonly categories = POLL_CATEGORIES;
  readonly limits = POLL_LIMITS;
  readonly saving = signal(false);
  readonly submitMessage = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    title: ['', [meaningfulText(5)]],
    category: ['' as PollCategory | ''],
    closesAt: [''],
    description: [''],
    prompts: this.formBuilder.array([this.createQuestionGroup()]),
  });

  get prompts(): FormArray {
    return this.form.controls.prompts;
  }

  choicesAt(questionIndex: number): FormArray {
    return this.prompts.at(questionIndex).get('choices') as FormArray;
  }

  addQuestion(): void {
    if (this.prompts.length < POLL_LIMITS.maximumPrompts) {
      this.prompts.push(this.createQuestionGroup());
    }
  }

  removeQuestion(index: number): void {
    if (this.prompts.length === 1) {
      this.prompts.at(0).reset({ text: '', multiple: false });
      return;
    }

    this.prompts.removeAt(index);
  }

  addAnswer(questionIndex: number): void {
    const choices = this.choicesAt(questionIndex);

    if (choices.length < POLL_LIMITS.maximumChoices) {
      choices.push(this.createAnswerGroup());
    }
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const choices = this.choicesAt(questionIndex);

    if (choices.length <= POLL_LIMITS.minimumChoices) {
      choices.at(answerIndex).reset({ text: '' });
      return;
    }

    choices.removeAt(answerIndex);
  }

  answerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  controlInvalid(control: { invalid: boolean; touched: boolean }): boolean {
    return control.invalid && control.touched;
  }

  close(): void {
    if (!this.saving()) {
      this.dialog.close();
    }
  }

  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    this.submitMessage.set(null);

    if (
      this.form.invalid ||
      !this.form.controls.category.value ||
      this.saving()
    ) {
      return;
    }

    this.saving.set(true);

    try {
      const id = await this.polls.create(this.toDraft());
      this.dialog.close();
      this.resetForm();
      await this.router.navigate(['/poll', id], {
        queryParams: { created: '1' },
      });
    } catch (error) {
      console.error('Survey creation failed', error);
      this.submitMessage.set('The survey could not be published.');
    } finally {
      this.saving.set(false);
    }
  }

  private createAnswerGroup() {
    return this.formBuilder.group({
      text: ['', [meaningfulText(1)]],
    });
  }

  private createQuestionGroup() {
    return this.formBuilder.group({
      text: ['', [meaningfulText(5)]],
      multiple: [false],
      choices: this.formBuilder.array([
        this.createAnswerGroup(),
        this.createAnswerGroup(),
      ]),
    });
  }

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
        choices: prompt.choices.map((choice) => ({
          text: normalizeText(choice.text),
        })),
      })),
    };
  }

  private resetForm(): void {
    while (this.prompts.length > 1) {
      this.prompts.removeAt(this.prompts.length - 1);
    }

    this.form.reset();
    this.prompts.at(0).reset({ text: '', multiple: false });
    const choices = this.choicesAt(0);

    while (choices.length > POLL_LIMITS.minimumChoices) {
      choices.removeAt(choices.length - 1);
    }

    for (const choice of choices.controls) {
      choice.reset({ text: '' });
    }
  }
}
