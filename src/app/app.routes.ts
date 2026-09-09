import { Routes } from '@angular/router';
import { PortfolioShellComponent } from './components/portfolio-shell/portfolio-shell';
import { MeComponent } from './pages/me';
import { ResumeComponent } from './pages/resume';
import { ConnectComponent } from './pages/connect';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioShellComponent,
    children: [
      { path: '', component: MeComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'connect', component: ConnectComponent }
    ]
  }
];
