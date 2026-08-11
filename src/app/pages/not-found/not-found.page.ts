/**
 * @file src/app/pages/not-found/not-found.page.ts
 * @description Not-found page controller.
 *
 * Minimal route component displayed when no configured application route matches the current URL.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector:'app-not-found-page', imports:[RouterLink], templateUrl:'./not-found.page.html', styleUrl:'./not-found.page.scss' })
export class NotFoundPage {}
