import { Routes } from '@angular/router';
import { Register } from '../views/register/register';
import { Home } from '../views/home/home';
import { Login } from '../views/login/login';
import { DashboardComponent } from '../views/dashboard/dashboard';
import { FeaturePage } from '../views/feature-page/feature-page';
import { Settings } from '../views/settings/settings';
import { Reports } from '../views/reports/reports';
import { RiskAnalysis } from '../views/risk-analysis/risk-analysis';
import { AssetsAndDerivatives } from '../views/assets-and-derivatives/assets-and-derivatives';
import { MarketData } from '../views/market-data/market-data';
import { PortfolioOverview } from '../views/portfolio-overview/portfolio-overview';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, data: { title: 'Home', showShell: false } },
  { path: 'register', component: Register, data: { title: 'Register', showShell: false } },
  { path: 'login', component: Login, data: { title: 'Sign In', showShell: false } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', showShell: true } },
  { path: 'portfolio', component: PortfolioOverview, data: { title: 'Portfolio', showShell: true } },
  { path: 'assets-and-derivatives', component: AssetsAndDerivatives, data: { title: 'Assets and Derivatives', showShell: true } },
  { path: 'market-data', component: MarketData, data: { title: 'Market Data', showShell: true } },
  { path: 'risk-analysis', component: RiskAnalysis, data: { title: 'Risk Analysis', showShell: true } },
  { path: 'reports', component: Reports, data: { title: 'Reports', showShell: true } },
  { path: 'settings', component: Settings, data: { title: 'Settings', showShell: true } },
  { path: '**', redirectTo: '/home' }
];
