/**
 * @file src/app/app.config.ts
 * @description Central Angular application configuration.
 *
 * Registers framework-level providers such as routing, zoneless change detection and browser error listeners in one place so feature components remain infrastructure-agnostic.
 */

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


/**
 * Framework-level providers used when bootstrapping the standalone application.
 *
 * Zoneless change detection is enabled because application state is signal-driven;
 * router and global browser error providers are registered once at the root.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ]
};