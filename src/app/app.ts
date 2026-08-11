/**
 * @file src/app/app.ts
 * @description Root application shell.
 */

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreatePollDialogComponent } from './presentation/create-poll-dialog/create-poll-dialog.component';
import { CreatePollDialogService } from './presentation/create-poll-dialog/create-poll-dialog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CreatePollDialogComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly createDialog = inject(CreatePollDialogService);
}
