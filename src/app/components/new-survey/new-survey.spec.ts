/**
 * @file src/app/components/new-survey/new-survey.spec.ts
 * @description Unit test specification for new-survey.
 *
 * Verifies the public behavior or creation contract of the corresponding unit. Tests document expected behavior and protect refactoring from regressions.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurvey } from './new-survey';

describe('NewSurvey', () => {
  let component: NewSurvey;
  let fixture: ComponentFixture<NewSurvey>;

  // Arrange shared test module/fixture before each isolated assertion.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSurvey],
    }).compileComponents();

    fixture = TestBed.createComponent(NewSurvey);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Smoke test: the Angular unit must instantiate with its declared dependencies.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
