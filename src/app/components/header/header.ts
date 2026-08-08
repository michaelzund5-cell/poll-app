/**
 * @file src/app/components/header/header.ts
 * @description Global header component.
 *
 * Tracks the current route to adapt header presentation on survey detail pages. Route state is converted into a computed signal so the template stays declarative.
 */

import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
/**
 * Global header with route-aware presentation state.
 *
 * Navigation events are reduced to a current URL signal; the template consumes the
 * computed `isSurveyDetail` value instead of inspecting Router state itself.
 */
export class Header {
  /** Router is used only as a source of navigation state. */
  private router = inject(Router);
  private currentUrl = signal(this.router.url);

  /** True while the active URL represents a survey detail page. */
  isSurveyDetail = computed(() => this.currentUrl().startsWith('/survey/'));

  /**
   * Synchronizes the URL signal after completed navigations.
   * NavigationEnd is used so redirects are already resolved before state is updated.
   */
  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
      }
    });
  }
}
