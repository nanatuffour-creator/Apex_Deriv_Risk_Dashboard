import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
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

  it('should keep the shell hidden on public pages and visible on dashboard pages', () => {
    const homeRoute = routes.find((route) => route.path === 'home');
    const loginRoute = routes.find((route) => route.path === 'login');
    const registerRoute = routes.find((route) => route.path === 'register');
    const dashboardRoute = routes.find((route) => route.path === 'dashboard');
    const portfolioRoute = routes.find((route) => route.path === 'portfolio');
    const marketDataRoute = routes.find((route) => route.path === 'market-data');
    const assetsRoute = routes.find((route) => route.path === 'assets-and-derivatives');
    const riskRoute = routes.find((route) => route.path === 'risk-analysis');
    const reportsRoute = routes.find((route) => route.path === 'reports');
    const settingsRoute = routes.find((route) => route.path === 'settings');

    expect(homeRoute?.data?.['showShell']).toBe(false);
    expect(loginRoute?.data?.['showShell']).toBe(false);
    expect(registerRoute?.data?.['showShell']).toBe(false);
    expect(dashboardRoute?.data?.['showShell']).toBe(true);
    expect(portfolioRoute?.data?.['showShell']).toBe(true);
    expect(marketDataRoute?.data?.['showShell']).toBe(true);
    expect(assetsRoute?.data?.['showShell']).toBe(true);
    expect(riskRoute?.data?.['showShell']).toBe(true);
    expect(reportsRoute?.data?.['showShell']).toBe(true);
    expect(settingsRoute?.data?.['showShell']).toBe(true);
  });
});
