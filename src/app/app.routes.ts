import { Routes } from '@angular/router';
import { PortfolioShellComponent } from './components/portfolio-shell/portfolio-shell';
import { MeComponent } from './pages/me';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioShellComponent,
    children: [
      { path: '', component: MeComponent },
    ]
  }
];
