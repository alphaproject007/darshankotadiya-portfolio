import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../core/services/portfolio-data.service';
import { Profile } from '../core/models/profile.model';
import { Experience } from '../core/models/experience.model';
import { Project } from '../core/models/project.model';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './me.html',
  styleUrl: './me.scss'
})
export class MeComponent implements OnInit {
  private readonly portfolioData = inject(PortfolioDataService);
  protected profile = signal<Profile | null>(null);
  protected experience = signal<Experience[]>([]);
  protected projects = signal<Project[]>([]);
  protected isLoading = signal(true);

  readonly techStack = ['Angular', 'TypeScript', 'Ionic', 'Java', 'Spring Boot'];

  readonly snapshotCards = [
    { value: '3.5+ Years', detail: 'Professional experience' },
    { value: 'Angular Focus', detail: 'Frontend engineering' },
    { value: 'Web + Mobile', detail: 'Cross-platform delivery' },
    { value: 'Enterprise Applications', detail: 'Business workflows' }
  ];

  readonly aboutSkills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'Ionic',
    'RxJS',
    'REST APIs',
    'Reactive Forms',
    'State Management',
    'Authentication',
    'Authorization',
    'Responsive Design',
    'Performance Optimization'
  ];

  readonly buildCapabilities = [
    {
      title: 'Enterprise Web Applications',
      tech: 'Angular / TypeScript',
      points: [
        'Enterprise workflows',
        'Reusable UI',
        'Forms',
        'Data-driven interfaces'
      ]
    },
    {
      title: 'Hybrid Mobile Applications',
      tech: 'Angular + Ionic',
      points: [
        'Web + Android + iOS application workflows',
        'Responsive interfaces',
        'Routing',
        'Offline-ready product experiences'
      ]
    },
    {
      title: 'API-Driven Applications',
      tech: 'REST APIs',
      points: [
        'Frontend integration',
        'Backend service communication',
        'Secure data flows',
        'Operational product workflows'
      ]
    },
    {
      title: 'Frontend Engineering',
      tech: 'Angular architecture',
      points: [
        'Reusable components',
        'Reactive Forms',
        'RxJS',
        'Performance',
        'Responsive UI'
      ]
    }
  ];

  ngOnInit(): void {
    this.portfolioData.getProfile().subscribe({
      next: (data: Profile) => {
        this.profile.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });

    this.portfolioData.getExperiences().subscribe(data => {
      this.experience.set(data);
    });

    this.portfolioData.getProjects().subscribe(data => {
      this.projects.set(data);
    });
  }

  protected formatPeriodRange(period: { start: string; end?: string | null }): string {
    const formatMonthYear = (value: string): string => {
      const [year, month] = value.split('-');
      const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = Number(month) - 1;
      return `${monthLabels[monthIndex] ?? month} ${year}`;
    };

    const start = formatMonthYear(period.start);
    const end = period.end ? formatMonthYear(period.end) : 'Present';
    return `${start} – ${end}`;
  }

  protected scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


