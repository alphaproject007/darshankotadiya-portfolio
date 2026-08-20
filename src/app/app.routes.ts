import { Routes } from '@angular/router';
import { PortfolioShellComponent } from './components/portfolio-shell/portfolio-shell';
import { MeComponent } from './pages/me';
import { MyWorkComponent } from './pages/my-work';
import { ExperienceComponent } from './pages/experience';
import { SkillsComponent } from './pages/skills';
import { MobileWorkComponent } from './pages/mobile-work';
import { HowIWorkComponent } from './pages/how-i-work';
import { ResumeComponent } from './pages/resume';
import { ConnectComponent } from './pages/connect';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioShellComponent,
    children: [
      { path: '', component: MeComponent },
      { path: 'my-work', component: MyWorkComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'mobile-work', component: MobileWorkComponent },
      { path: 'how-i-work', component: HowIWorkComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'connect', component: ConnectComponent }
    ]
  }
];
