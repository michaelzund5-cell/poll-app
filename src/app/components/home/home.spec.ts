/**
 * @file src/app/components/home/home.spec.ts
 * @description Unit test specification for home.
 *
 * Verifies the public behavior or creation contract of the corresponding unit. Tests document expected behavior and protect refactoring from regressions.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  // Arrange shared test module/fixture before each isolated assertion.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Smoke test: the Angular unit must instantiate with its declared dependencies.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
