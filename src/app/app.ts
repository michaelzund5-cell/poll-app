/**
 * @file src/app/app.ts
 * @description Root Angular component.
 *
 * Provides the application shell. It composes global UI such as the header with RouterOutlet and intentionally contains no survey business logic.
 */

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
/**
 * Root shell for the application.
 *
 * The root component should stay deliberately small: global layout belongs here,
 * while feature state and business behavior remain in feature components/services.
 */
export class App {
  /** Application title kept as a signal so template consumers remain reactive. */
  protected readonly title = signal('Poll-App');
}
