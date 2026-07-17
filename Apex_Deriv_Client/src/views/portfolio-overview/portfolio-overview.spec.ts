import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioOverview } from './portfolio-overview';

describe('PortfolioOverview', () => {
  let component: PortfolioOverview;
  let fixture: ComponentFixture<PortfolioOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
