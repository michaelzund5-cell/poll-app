/**
 * @file src/app/components/hero/hero.spec.ts
 * @description Unit test specification for hero.
 *
 * Verifies the public behavior or creation contract of the corresponding unit. Tests document expected behavior and protect refactoring from regressions.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  // Arrange shared test module/fixture before each isolated assertion.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Smoke test: the Angular unit must instantiate with its declared dependencies.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
