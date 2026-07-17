import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KpiCard {
  title: string;
  icon: string;
  value: string;
  change?: string;
  changeDirection?: 'up' | 'down' | 'neutral';
  badge?: { text: string; variant: 'success' | 'warning' | 'danger' | 'info' };
}

interface MarketRow {
  asset: string;
  symbol: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
  status: 'Active' | 'Watch' | 'Closed';
}

interface HoldingRow {
  asset: string;
  assetClass: string;
  marketValue: string;
  allocation: number;
  change: string;
  direction: 'up' | 'down';
}

interface TransactionItem {
  time: string;
  icon: string;
  title: string;
  description: string;
  iconBg: string;
}

interface NewsItem {
  category: string;
  headline: string;
  time: string;
  icon: string;
}

interface WatchlistRow {
  asset: string;
  symbol: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
}

interface EventItem {
  date: string;
  month: string;
  event: string;
  category: string;
  categoryVariant: 'primary' | 'warning' | 'info' | 'danger';
}

interface QuickAction {
  label: string;
  icon: string;
}

interface SystemStatusItem {
  label: string;
  status: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  today: Date = new Date();

  kpiCards: KpiCard[] = [
    { title: 'Portfolio Value', icon: 'bi-wallet2', value: '$8,450,000', change: '+2.35%', changeDirection: 'up' },
    { title: "Today's Profit/Loss", icon: 'bi-graph-up-arrow', value: '+$54,280', change: '+0.64%', changeDirection: 'up' },
    { title: 'Market Exposure', icon: 'bi-bar-chart-line', value: '$6,120,000', change: '72.4% of NAV', changeDirection: 'neutral' },
    { title: 'Open Positions', icon: 'bi-collection', value: '31', change: '6 asset classes', changeDirection: 'neutral' },
    { title: 'Risk Score', icon: 'bi-shield-check', value: 'Medium', badge: { text: 'Moderate', variant: 'warning' } },
    { title: 'Active Alerts', icon: 'bi-bell', value: '4', change: '2 require review', changeDirection: 'neutral' }
  ];

  performanceMetrics = [
    { label: "Today's Return", value: '+0.64%', direction: 'up' },
    { label: 'Weekly Return', value: '+1.82%', direction: 'up' },
    { label: 'Monthly Return', value: '+3.47%', direction: 'up' },
    { label: 'Year-to-Date Return', value: '+11.92%', direction: 'up' }
  ];

  assetAllocation = [
    { label: 'Equities', value: 40, color: '#0F172A' },
    { label: 'Bonds', value: 20, color: '#1E3A8A' },
    { label: 'Commodities', value: 15, color: '#B45309' },
    { label: 'ETFs', value: 10, color: '#0E7490' },
    { label: 'Forex', value: 8, color: '#4338CA' },
    { label: 'Crypto', value: 7, color: '#BE123C' }
  ];

  marketOverview: MarketRow[] = [
    { asset: 'S&P 500', symbol: 'SPX', price: '5,464.62', change: '+0.42%', direction: 'up', status: 'Active' },
    { asset: 'NASDAQ', symbol: 'IXIC', price: '17,862.35', change: '+0.68%', direction: 'up', status: 'Active' },
    { asset: 'Gold', symbol: 'XAU/USD', price: '2,412.80', change: '+1.15%', direction: 'up', status: 'Active' },
    { asset: 'Crude Oil', symbol: 'WTI', price: '78.24', change: '-0.87%', direction: 'down', status: 'Watch' },
    { asset: 'EUR/USD', symbol: 'FX', price: '1.0842', change: '-0.12%', direction: 'down', status: 'Active' },
    { asset: 'Bitcoin', symbol: 'BTC', price: '67,450.00', change: '+2.94%', direction: 'up', status: 'Active' }
  ];

  topHoldings: HoldingRow[] = [
    { asset: 'Apple', assetClass: 'Equity', marketValue: '$1,240,000', allocation: 14.7, change: '+1.24%', direction: 'up' },
    { asset: 'Microsoft', assetClass: 'Equity', marketValue: '$1,085,000', allocation: 12.8, change: '+0.86%', direction: 'up' },
    { asset: 'Tesla', assetClass: 'Equity', marketValue: '$742,000', allocation: 8.8, change: '-2.14%', direction: 'down' },
    { asset: 'Gold ETF', assetClass: 'Commodity', marketValue: '$615,000', allocation: 7.3, change: '+1.02%', direction: 'up' },
    { asset: 'US Treasury Bond', assetClass: 'Fixed Income', marketValue: '$980,000', allocation: 11.6, change: '+0.18%', direction: 'up' },
    { asset: 'Bitcoin ETF', assetClass: 'Crypto', marketValue: '$430,000', allocation: 5.1, change: '+3.42%', direction: 'up' }
  ];

  recentTransactions: TransactionItem[] = [
    { time: '09:42 AM', icon: 'bi-bag-check-fill', title: 'Purchased Apple Shares', description: '250 shares acquired at $214.32 avg. price', iconBg: 'success' },
    { time: '08:15 AM', icon: 'bi-fire', title: 'Opened Gold Futures Position', description: '10 contracts opened, expiry Dec 2026', iconBg: 'warning' },
    { time: 'Yesterday, 4:52 PM', icon: 'bi-x-circle-fill', title: 'Closed EUR/USD Trade', description: 'Position closed with +$3,240 realized gain', iconBg: 'info' },
    { time: 'Yesterday, 1:10 PM', icon: 'bi-plus-circle-fill', title: 'Added Bitcoin ETF', description: '85 units added to crypto allocation', iconBg: 'primary' },
    { time: '2 days ago', icon: 'bi-arrow-repeat', title: 'Rebalanced Portfolio', description: 'Adjusted equity and bond weights to target', iconBg: 'secondary' }
  ];

  marketNews: NewsItem[] = [
    { category: 'Monetary Policy', headline: 'Federal Reserve holds interest rates steady amid inflation watch', time: '1h ago', icon: 'bi-bank' },
    { category: 'Commodities', headline: 'Gold prices rise amid persistent inflation concerns', time: '2h ago', icon: 'bi-gem' },
    { category: 'Equities', headline: 'Tesla shares increase after better-than-expected earnings', time: '3h ago', icon: 'bi-graph-up' },
    { category: 'Energy', headline: 'Oil prices fall on rising supply data from OPEC+', time: '5h ago', icon: 'bi-droplet-half' },
    { category: 'Crypto', headline: 'Bitcoin reaches a new monthly high above $67,000', time: '6h ago', icon: 'bi-currency-bitcoin' }
  ];

  riskMetrics = [
    { label: 'Portfolio VaR (95%)', value: '$186,400', sub: '1-day horizon', icon: 'bi-exclamation-diamond' },
    { label: 'Portfolio Beta', value: '1.08', sub: 'vs. S&P 500', icon: 'bi-activity' },
    { label: 'Volatility', value: '14.6%', sub: 'Annualized', icon: 'bi-graph-up-arrow' },
    { label: 'Sharpe Ratio', value: '1.42', sub: 'Risk-adjusted return', icon: 'bi-speedometer2' }
  ];

  watchlist: WatchlistRow[] = [
    { asset: 'Apple', symbol: 'AAPL', price: '214.32', change: '+1.24%', direction: 'up' },
    { asset: 'Tesla', symbol: 'TSLA', price: '198.45', change: '-2.14%', direction: 'down' },
    { asset: 'Microsoft', symbol: 'MSFT', price: '441.58', change: '+0.86%', direction: 'up' },
    { asset: 'Gold', symbol: 'XAU/USD', price: '2,412.80', change: '+1.15%', direction: 'up' },
    { asset: 'Bitcoin', symbol: 'BTC', price: '67,450.00', change: '+2.94%', direction: 'up' },
    { asset: 'EUR/USD', symbol: 'FX', price: '1.0842', change: '-0.12%', direction: 'down' }
  ];

  upcomingEvents: EventItem[] = [
    { date: '18', month: 'JUL', event: 'Federal Reserve Meeting', category: 'Macro', categoryVariant: 'primary' },
    { date: '22', month: 'JUL', event: 'Apple Earnings', category: 'Earnings', categoryVariant: 'info' },
    { date: '23', month: 'JUL', event: 'Tesla Earnings', category: 'Earnings', categoryVariant: 'info' },
    { date: '29', month: 'JUL', event: 'Gold Futures Expiry', category: 'Derivatives', categoryVariant: 'warning' },
    { date: '01', month: 'AUG', event: 'Options Expiration Friday', category: 'Derivatives', categoryVariant: 'warning' }
  ];

  quickActions: QuickAction[] = [
    { label: 'Analyze Portfolio', icon: 'bi-clipboard-data' },
    { label: 'View Assets', icon: 'bi-collection' },
    { label: 'Open Risk Analysis', icon: 'bi-shield-exclamation' },
    { label: 'Generate Report', icon: 'bi-file-earmark-bar-graph' },
    { label: 'Market Data', icon: 'bi-globe2' },
    { label: 'Settings', icon: 'bi-gear' }
  ];

  systemStatus: SystemStatusItem[] = [
    { label: 'Market Data Feed', status: 'Connected', icon: 'bi-broadcast' },
    { label: 'Database', status: 'Online', icon: 'bi-database-check' },
    { label: 'Risk Engine', status: 'Running', icon: 'bi-cpu' },
    { label: 'API Status', status: 'Healthy', icon: 'bi-hdd-network' }
  ];

  refreshDashboard(): void {
    this.today = new Date();
  }
}