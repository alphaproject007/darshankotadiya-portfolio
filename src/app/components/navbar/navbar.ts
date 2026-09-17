import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Github, Linkedin, LucideAngularModule, Mail, Menu, Moon, Sun, X, type LucideIconData } from 'lucide-angular';
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
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

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

  protected getSocialUrl(social: SocialLink): string {
    if (social.platform.toLowerCase() !== 'email') {
      return social.url;
    }

    const email = social.url.replace(/^mailto:/i, '');
    return `mailto:${email}`;
  }

  protected getThemeIcon(): LucideIconData {
    return this.themeService.themeMode() === 'dark' ? Sun : Moon;
  }

  protected getMenuIcon(): LucideIconData {
    return this.mobileMenuOpen() ? X : Menu;
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