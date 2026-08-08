/**
 * @file src/app/components/not-found/not-found.spec.ts
 * @description Unit test specification for not-found.
 *
 * Verifies the public behavior or creation contract of the corresponding unit. Tests document expected behavior and protect refactoring from regressions.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  // Arrange shared test module/fixture before each isolated assertion.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Smoke test: the Angular unit must instantiate with its declared dependencies.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
