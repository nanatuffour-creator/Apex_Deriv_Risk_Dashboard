import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAndDerivatives } from './assets-and-derivatives';

describe('AssetsAndDerivatives', () => {
  let component: AssetsAndDerivatives;
  let fixture: ComponentFixture<AssetsAndDerivatives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsAndDerivatives],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsAndDerivatives);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
