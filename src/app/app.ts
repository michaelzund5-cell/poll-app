/**
 * @file src/app/app.ts
 * @description Root component.
 *
 * Provides the application shell and owns only top-level rendering concerns. Feature logic stays in the page/application layers.
 */

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
