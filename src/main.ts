/**
 * @file src/main.ts
 * @description Application bootstrap entry point.
 *
 * Starts the standalone Angular application with the root component and the central application configuration. Keeping bootstrap logic here makes startup behavior explicit and separate from feature code.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Bootstrap is intentionally the only runtime action in this file. Application
// configuration and feature behavior remain testable/importable without startup side effects.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
