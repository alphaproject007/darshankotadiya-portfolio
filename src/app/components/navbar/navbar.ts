import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideMail,
  LucideMenu,
  LucideMoon,
  LucideSun,
  LucideX,
  type LucideIcon
} from '@lucide/angular';
import { siGithub } from 'simple-icons';
import { SocialLink } from '../../core/models/social.model';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ThemeService } from '../../core/services/theme.service';

interface NavItem {
  label: string;
  route?: string; // full route for dedicated pages
  section?: string; // in-page section id for Me page
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideDynamicIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly socialLinks = signal<SocialLink[]>([]);
  protected readonly visibleSocialLinks = computed(() =>
    this.socialLinks().filter(link => ['linkedin', 'github', 'email'].includes(link.platform.toLowerCase()))
  );
  private readonly portfolioData = inject(PortfolioDataService);

  protected readonly navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'About', section: 'about' },
    { label: 'Experience', section: 'experience' },
    { label: 'Projects', section: 'projects' },
    { label: 'Skills', section: 'skills' }
  ];

  constructor() {
    this.setupKeyboardHandling();
    this.portfolioData.getSocial().subscribe(data => {
      this.socialLinks.set(data.links ?? []);
    });
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected onNavItemClick(): void {
    this.closeMobileMenu();
  }

  protected handleNav(item: NavItem): void {
    this.closeMobileMenu();

    if (item.section) {
      // Try to scroll to in-page section smoothly.
      const el = document.getElementById(item.section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // If section not present, fall back to navigating to root first then scroll after a short delay.
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const target = document.getElementById(item.section!);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 180);
      });
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  protected cycleTheme(): void {
    const nextTheme = this.themeService.themeMode() === 'dark' ? 'light' : 'dark';
    this.themeService.setThemeMode(nextTheme);
  }

  protected getThemeTitle(): string {
    return this.themeService.themeMode() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  }

  protected getSocialIcon(platform: string): LucideIcon {
    return LucideMail;
  }

  protected getSocialSvg(platform: string): SafeHtml | null {
    const normalized = platform.toLowerCase();
    const svg = normalized === 'github' ? siGithub.svg : null;
    if (!svg) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustHtml(
      svg.replace(
        '<svg ',
        '<svg aria-hidden="true" fill="currentColor" width="18" height="18" class="h-4 w-4" '
      )
    );
  }

  protected getSocialUrl(social: SocialLink): string {
    if (social.platform.toLowerCase() !== 'email') {
      return social.url;
    }

    const email = social.url.replace(/^mailto:/i, '');
    return `mailto:${email}`;
  }

  protected getThemeIcon(): LucideIcon {
    return this.themeService.themeMode() === 'dark' ? LucideSun : LucideMoon;
  }

  protected getMenuIcon(): LucideIcon {
    return this.mobileMenuOpen() ? LucideX : LucideMenu;
  }

  private setupKeyboardHandling(): void {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && this.mobileMenuOpen()) {
        this.closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  }
}