/**
 * @file src/main.ts
 * @description Application bootstrap.
 *
 * Starts the standalone Angular application with the root component and the central application configuration.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
bootstrapApplication(App, appConfig).catch((error) => console.error(error));
//# sourceMappingURL=main.js.map