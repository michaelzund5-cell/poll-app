/**
 * @file src/app/app.spec.ts
 * @description Unit test specification for app.
 *
 * Verifies the public behavior or creation contract of the corresponding unit. Tests document expected behavior and protect refactoring from regressions.
 */

import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  // Arrange shared test module/fixture before each isolated assertion.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Poll-App');
  });
});
