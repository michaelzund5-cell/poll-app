/**
 * @file src/app/app.config.ts
 * @description Angular application configuration.
 *
 * Registers application-wide providers. Routing is configured here so page components remain independent from bootstrap details.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};


