/**
 * @file src/app/components/home/home.ts
 * @description Home page composition component.
 *
 * Acts as a page-level container for Hero and Surveys. It intentionally has no business logic; its responsibility is composition and page structure.
 */

import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Surveys } from '../surveys/surveys';

@Component({
  selector: 'app-home',
  imports: [Hero, Surveys],
  templateUrl: './home.html',

})
/**
 * Page-level composition component for the landing page.
 * No state is kept here because Hero and Surveys own their respective responsibilities.
 */
export class Home {}
