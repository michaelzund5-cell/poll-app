/**
 * @file src/app/components/hero/hero.ts
 * @description Home-page hero component.
 *
 * Owns the hero call-to-action and delegates survey creation to NewSurvey. It emits a domain-neutral event when creation succeeds so parent components can react without knowing dialog internals.
 */

import { Component, output, viewChild } from '@angular/core';
import { NewSurvey } from '../new-survey/new-survey';

@Component({
  selector: 'app-hero',
  imports: [NewSurvey],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
/**
 * Home hero controller.
 *
 * It owns only hero-level interaction: opening NewSurvey and re-emitting successful
 * creation so the surrounding page can refresh data without coupling to the dialog.
 */
export class Hero {
  /** Type-safe reference to the child dialog component after it is rendered. */
  newSurveyDialog = viewChild(NewSurvey);
  /** Event exposed to the parent when NewSurvey reports a successful creation. */
  surveyCreated = output<void>();

  /** Opens the child survey-creation dialog when the view reference is available. */
  openDialog(): void {
    this.newSurveyDialog()?.open();
  }
}
