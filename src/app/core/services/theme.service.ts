import { Injectable, effect, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme-mode';

  readonly themeMode = signal<ThemeMode>(this.loadThemeMode());

  constructor() {
    effect(() => {
      this.applyTheme(this.themeMode());
    });
  }

  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    localStorage.setItem(this.STORAGE_KEY, mode);
  }

  private loadThemeMode(): ThemeMode {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (stored === 'dark' || stored === 'light') {
      return stored;
    }

    return this.getSystemTheme();
  }

  private getSystemTheme(): ThemeMode {
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
    ) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return 'dark';
  }

  private applyTheme(theme: ThemeMode): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;

    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
  }
}