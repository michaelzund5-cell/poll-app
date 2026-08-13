/**
 * @file src/app/presentation/create-poll-dialog/create-poll-dialog.service.ts
 * @description Shared presentation state for the New Survey modal.
 */

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CreatePollDialogService {
  private readonly state = signal(false);

  readonly visible = this.state.asReadonly();

  open(): void {
    this.state.set(true);
  }

  close(): void {
    this.state.set(false);
  }
}


