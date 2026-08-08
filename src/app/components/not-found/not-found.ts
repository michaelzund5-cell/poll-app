/**
 * @file src/app/components/not-found/not-found.ts
 * @description Fallback page for unknown or invalid routes.
 *
 * Provides a dedicated user-facing destination for navigation failures instead of leaving invalid states inside feature components.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
/** Dedicated fallback component for unresolved routes/resources. */
export class NotFound {}
