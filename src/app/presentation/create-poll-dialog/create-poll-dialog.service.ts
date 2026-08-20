/**
 * @file src/app/presentation/create-poll-dialog/create-poll-dialog.service.ts
 * @description Shared presentation state for the New Survey modal.
 */

import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CreatePollDialogService {
  private readonly document = inject(DOCUMENT);
  private readonly state = signal(false);

  readonly visible = this.state.asReadonly();

  /** Opens the modal and prevents the page behind it from scrolling. */
  open(): void {
    this.state.set(true);
    this.document.body.classList.add('modal-open');
  }

  /** Closes the modal and restores background scrolling. */
  close(): void {
    this.state.set(false);
    this.document.body.classList.remove('modal-open');
  }
}
