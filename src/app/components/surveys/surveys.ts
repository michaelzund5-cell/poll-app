/**
 * @file src/app/components/surveys/surveys.ts
 * @description Survey list and filtering component.
 *
 * Loads the survey collection and exposes derived lists for tabs, categories and upcoming deadlines. Computed signals keep filtering/sorting derived from source state instead of manually synchronized copies.
 */

import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SURVEY_CATEGORIES,
  SurveyCategory,
} from '../../features/surveys/constants/survey.constants';
import { Survey } from '../../features/surveys/models/survey.model';
import { SurveyService } from '../../features/surveys/services/survey.service';
import {
  getDeadlineText,
  getDaysUntil,
  isSurveyPast,
} from '../../features/surveys/utils/survey-date.util';

/** Tabs available in the survey collection view. */
type SurveyTab = 'active' | 'past';

@Component({
  selector: 'app-surveys',
  imports: [RouterLink],
  templateUrl: './surveys.html',
  styleUrl: './surveys.scss',
})
/**
 * Survey collection controller.
 *
 * A single source signal stores fetched surveys. Every visible subset is derived with
 * computed signals, avoiding manually synchronized filtered copies and change detection.
 */
export class Surveys {
  readonly activeTab = signal<SurveyTab>('active');
  readonly selectedCategory = signal<SurveyCategory | null>(null);
  readonly categoryOpen = signal(false);
  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly categories = SURVEY_CATEGORIES;

  private readonly surveyService = inject(SurveyService);
  private readonly surveys = signal<Survey[]>([]);

  /**
   * The three nearest non-expired surveys with explicit deadlines.
   * This is derived state and therefore updates automatically whenever source data changes.
   */
  readonly endingSurveys = computed(() =>
    [...this.surveys()]
      .filter((survey) => survey.endDate && getDaysUntil(survey.endDate) >= 0)
      .sort((a, b) => (a.endDate?.getTime() ?? Infinity) - (b.endDate?.getTime() ?? Infinity))
      .slice(0, 3),
  );

  /** Active/past and category-filtered collection rendered by the main survey list. */
  readonly filteredSurveys = computed(() => {
    const tab = this.activeTab();
    const category = this.selectedCategory();

    let result = this.surveys().filter((survey) =>
      tab === 'past' ? isSurveyPast(survey.endDate) : !isSurveyPast(survey.endDate),
    );

    if (category) {
      result = result.filter((survey) => survey.category === category);
    }

    return tab === 'active'
      ? [...result].sort(
          (a, b) => (a.endDate?.getTime() ?? Infinity) - (b.endDate?.getTime() ?? Infinity),
        )
      : result;
  });

  /**
   * Triggers the first collection load when the page component is instantiated.
   */
  constructor() {
    void this.loadSurveys();
  }

  /**
   * Toggles only the dropdown presentation state; selected filter state is independent.
   */
  toggleCategoryDropdown(): void {
    this.categoryOpen.update((open) => !open);
  }

  /**
   * Changes the active/past view; computed collections react automatically.
   */
  setTab(tab: SurveyTab): void {
    this.activeTab.set(tab);
  }

  /**
   * Applies or clears a category filter and closes the dropdown.
   */
  selectCategory(category: SurveyCategory | null): void {
    this.selectedCategory.set(category);
    this.categoryOpen.set(false);
  }

  /** Closes the category filter when focus moves elsewhere on the page. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.categoryOpen()) return;
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.sort-dropdown')) this.categoryOpen.set(false);
  }

  /**
   * Owns collection loading state and user-facing errors while delegating data access to SurveyService.
   */
  async loadSurveys(): Promise<void> {
    this.isLoading.set(true);
    this.loadError.set(null);

    try {
      this.surveys.set(await this.surveyService.getAll());
    } catch (error) {
      console.error('Failed to load surveys', error);
      this.loadError.set('Surveys could not be loaded.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Template adapter for the shared deadline formatter; keeps date wording consistent with other consumers.
   */
  getDeadlineText(endDate?: Date): string {
    return getDeadlineText(endDate);
  }
}
