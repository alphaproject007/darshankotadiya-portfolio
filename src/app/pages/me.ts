import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Briefcase,
  ClipboardList,
  Code,
  Database,
  Download,
  ExternalLink,
  Gauge,
  Github,
  Layers2,
  Linkedin,
  LucideAngularModule,
  Mail,
  MapPin,
  MonitorSmartphone,
  Network,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Zap,
  type LucideIconData
} from 'lucide-angular';
import {
  siAngular,
  siBootstrap,
  siCss,
  siGit,
  siHtml5,
  siIonic,
  siJenkins,
  siJira,
  siJavascript,
  siMysql,
  siNodedotjs,
  siNgrx,
  siOpenjdk,
  siPostman,
  siPostgresql,
  siReact,
  siReactivex,
  siSpringboot,
  siTypescript
} from 'simple-icons';
import { Profile } from '../core/models/profile.model';
import { Experience } from '../core/models/experience.model';
import { Project } from '../core/models/project.model';
import { SkillCategory } from '../core/models/skills.model';
import { SocialLink } from '../core/models/social.model';
import { PortfolioDataService } from '../core/services/portfolio-data.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './me.html',
  styleUrl: './me.scss'
})
export class MeComponent implements OnInit {
  private readonly portfolioData = inject(PortfolioDataService);
  private readonly sanitizer = inject(DomSanitizer);
  protected profile = signal<Profile | null>(null);
  protected experience = signal<Experience[]>([]);
  protected projects = signal<Project[]>([]);
  protected skills = signal<SkillCategory[]>([]);
  protected socialLinks = signal<SocialLink[]>([]);
  protected isLoading = signal(true);
  protected profileImageError = signal(false);
  readonly currentYear = new Date().getFullYear();

  readonly techStack = [
    { label: 'Angular', key: 'angular' },
    { label: 'TypeScript', key: 'typescript' },
    { label: 'Ionic', key: 'ionic' },
    { label: 'Java', key: 'java' },
    { label: 'Spring Boot', key: 'spring boot' },
    { label: 'REST APIs', key: 'rest apis', icon: Server },
    { label: 'RxJS', key: 'rxjs' }
  ];

  private readonly technologySvgMap = new Map<string, string>([
    ['angular', siAngular.svg],
    ['angular material', siAngular.svg],
    ['typescript', siTypescript.svg],
    ['javascript', siJavascript.svg],
    ['ionic', siIonic.svg],
    ['spring boot', siSpringboot.svg],
    ['spring boot (working knowledge)', siSpringboot.svg],
    ['react', siReact.svg],
    ['react native', siReact.svg],
    ['node.js', siNodedotjs.svg],
    ['node.js (basic)', siNodedotjs.svg],
    ['git', siGit.svg],
    ['jira', siJira.svg],
    ['postman', siPostman.svg],
    ['jenkins', siJenkins.svg],
    ['java', siOpenjdk.svg],
    ['java (working knowledge)', siOpenjdk.svg],
    ['rxjs', siReactivex.svg],
    ['mysql', siMysql.svg],
    ['postgresql', siPostgresql.svg],
    ['html5', siHtml5.svg],
    ['css3', siCss.svg],
    ['bootstrap', siBootstrap.svg],
    ['ngrx / state management', siNgrx.svg]
  ]);

  readonly orbitPoints = [
    { position: 'top-0 left-1/2 -translate-x-1/2', size: 'h-2.5 w-2.5', color: 'bg-gradient-to-r from-blue-500 to-cyan-400' },
    { position: 'top-[18%] right-[4%] translate-x-1/2', size: 'h-3 w-3', color: 'bg-gradient-to-r from-violet-500 to-purple-500' },
    { position: 'right-0 top-1/2 -translate-y-1/2', size: 'h-2.5 w-2.5', color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { position: 'bottom-[10%] right-[12%]', size: 'h-3 w-3', color: 'bg-gradient-to-r from-emerald-400 to-teal-500' },
    { position: 'bottom-0 left-1/2 -translate-x-1/2', size: 'h-2.5 w-2.5', color: 'bg-gradient-to-r from-indigo-500 to-violet-500' },
    { position: 'left-0 top-1/2 -translate-y-1/2', size: 'h-2.5 w-2.5', color: 'bg-gradient-to-r from-sky-400 to-blue-600' },
    { position: 'left-[10%] top-[12%]', size: 'h-3 w-3', color: 'bg-gradient-to-r from-fuchsia-500 to-violet-500' }
  ];

  readonly snapshotCards = [
    { value: '3.5+ Years', detail: 'Professional experience' },
    { value: 'Angular Focus', detail: 'Frontend engineering' },
    { value: 'Web + Mobile', detail: 'Cross-platform delivery' },
    { value: 'Enterprise Applications', detail: 'Business workflows' }
  ];

  readonly capabilityIcons = {
    'Enterprise Web Applications': Code,
    'Hybrid Mobile Applications': Smartphone,
    'API-Driven Applications': Server,
    'Frontend Engineering': Layers2
  };

  protected readonly mapPinIcon = MapPin;
  protected readonly mailIcon = Mail;
  protected readonly downloadIcon = Download;
  protected readonly arrowRightIcon = ArrowRight;
  protected readonly externalLinkIcon = ExternalLink;
  protected readonly briefcaseIcon = Briefcase;
  protected readonly shieldIcon = Shield;
  protected readonly gaugeIcon = Gauge;
  protected readonly clipboardIcon = ClipboardList;
  protected readonly sparklesIcon = Sparkles;
  protected readonly databaseIcon = Database;
  protected readonly zapIcon = Zap;
  protected readonly monitorSmartphoneIcon = MonitorSmartphone;

  protected readonly nameParts = computed(() => {
    const fullName = this.profile()?.name ?? 'Darshan Kotadiya';
    return fullName.split(' ');
  });

  protected readonly coreStrengths = computed(() => {
    const uniqueSkills = new Set<string>();
    for (const category of this.skills()) {
      for (const skill of category.skills ?? []) {
        if (skill && skill.trim().length > 0) {
          uniqueSkills.add(skill.trim());
        }
      }
    }

    return Array.from(uniqueSkills).slice(0, 12);
  });

  readonly buildCapabilities = [
    {
      title: 'Enterprise Web Applications',
      tech: 'Angular / TypeScript',
      points: [
        'Enterprise workflows',
        'Reusable UI',
        'Forms',
        'Data-driven interfaces'
      ],
      icon: Code
    },
    {
      title: 'Hybrid Mobile Applications',
      tech: 'Angular + Ionic',
      points: [
        'Web + Android + iOS application workflows',
        'Responsive interfaces',
        'Routing',
        'Offline-ready product experiences'
      ],
      icon: Smartphone
    },
    {
      title: 'API-Driven Applications',
      tech: 'REST APIs',
      points: [
        'Frontend integration',
        'Backend service communication',
        'Secure data flows',
        'Operational product workflows'
      ],
      icon: Server
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
      ],
      icon: Layers2
    }
  ];

  protected getTechnologySvg(tech: string): SafeHtml | null {
    const normalized = tech.trim().toLowerCase();
    const svg = this.technologySvgMap.get(normalized) ?? null;
    if (!svg) {
      return null;
    }
    if (!svg.length) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustHtml(
      svg.replace(
        '<svg ',
        '<svg aria-hidden="true" fill="currentColor" width="18" height="18" class="h-4 w-4 shrink-0" '
      )
    );
  }

  protected getSkillSvg(skill: string): SafeHtml | null {
    return this.getTechnologySvg(skill);
  }

  protected getTechnologyIcon(tech: string): LucideIconData | null {
    const normalized = tech.trim().toLowerCase();
    if (normalized === 'rest apis') {
      return Network;
    }
    if (
      normalized.includes('jwt') ||
      normalized.includes('session') ||
      normalized.includes('rbac') ||
      normalized.includes('role-based')
    ) {
      return Shield;
    }
    return null;
  }

  protected getCategoryIcon(categoryName: string): LucideIconData {
    const normalized = categoryName.toLowerCase();
    if (normalized.includes('frontend')) {
      return Code;
    }
    if (normalized.includes('mobile')) {
      return Smartphone;
    }
    if (normalized.includes('backend') || normalized.includes('api')) {
      return Server;
    }
    if (normalized.includes('testing')) {
      return Shield;
    }
    if (normalized.includes('tools')) {
      return Zap;
    }
    if (normalized.includes('security')) {
      return Shield;
    }
    if (normalized.includes('database')) {
      return Database;
    }
    return Sparkles;
  }

  protected getFooterSocialLinks(): SocialLink[] {
    return this.socialLinks().filter(link => {
      const platform = link.platform.toLowerCase();
      return ['linkedin', 'github', 'email'].includes(platform);
    });
  }

  protected getSocialIcon(platform: string): LucideIconData {
    const normalized = platform.toLowerCase();
    if (normalized === 'linkedin') {
      return Linkedin;
    }
    if (normalized === 'github') {
      return Github;
    }
    return Mail;
  }

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

    this.portfolioData.getSkills().subscribe(data => {
      this.skills.set(data.categories ?? []);
    });

    this.portfolioData.getSocial().subscribe(data => {
      this.socialLinks.set(data.links ?? []);
    });
  }

  protected handleProfileImageError(): void {
    this.profileImageError.set(true);
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
