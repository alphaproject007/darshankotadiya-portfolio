import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly mobileMenuOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'About', route: '/' },
    { label: 'Projects', route: '/my-work' },
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Mobile', route: '/mobile-work' },
    { label: 'Approach', route: '/how-i-work' },
    { label: 'Resume', route: '/resume' },
    { label: 'Contact', route: '/connect' }
  ];

  constructor() {
    this.setupKeyboardHandling();
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

  protected cycleTheme(): void {
  const nextTheme =
    this.themeService.themeMode() === 'dark'
      ? 'light'
      : 'dark';
    this.themeService.setThemeMode(nextTheme);
  }

  protected getThemeTitle(): string {
    return this.themeService.themeMode() === 'dark'
      ? 'Switch to light theme'
      : 'Switch to dark theme';
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