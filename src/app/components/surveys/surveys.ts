import { Component, computed, inject, signal } from '@angular/core';
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

type SurveyTab = 'active' | 'past';

@Component({
  selector: 'app-surveys',
  imports: [RouterLink],
  templateUrl: './surveys.html',
  styleUrl: './surveys.scss',
})
export class Surveys {
  readonly activeTab = signal<SurveyTab>('active');
  readonly selectedCategory = signal<SurveyCategory | null>(null);
  readonly categoryOpen = signal(false);
  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly categories = SURVEY_CATEGORIES;

  private readonly surveyService = inject(SurveyService);
  private readonly surveys = signal<Survey[]>([]);

  readonly endingSurveys = computed(() =>
    [...this.surveys()]
      .filter((survey) => survey.endDate && getDaysUntil(survey.endDate) >= 0)
      .sort((a, b) => (a.endDate?.getTime() ?? Infinity) - (b.endDate?.getTime() ?? Infinity))
      .slice(0, 3),
  );

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

  constructor() {
    void this.loadSurveys();
  }

  toggleCategoryDropdown(): void {
    this.categoryOpen.update((open) => !open);
  }

  setTab(tab: SurveyTab): void {
    this.activeTab.set(tab);
  }

  selectCategory(category: SurveyCategory | null): void {
    this.selectedCategory.set(category);
    this.categoryOpen.set(false);
  }

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

  getDeadlineText(endDate?: Date): string {
    return getDeadlineText(endDate);
  }
}
