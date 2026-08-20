import { Injectable, effect, signal } from '@angular/core';

type ThemeMode = 'dark' | 'light' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme-mode';

  readonly themeMode = signal<ThemeMode>(this.loadThemeMode());
  readonly effectiveTheme = signal<'dark' | 'light'>(this.resolveEffectiveTheme());

  constructor() {
    // Update effective theme when mode changes
    effect(() => {
      this.effectiveTheme.set(this.resolveEffectiveTheme());
    });

    // Apply theme to document and watch for system preference changes
    effect(() => {
      this.applyTheme(this.effectiveTheme());
    });

    this.setupSystemPreferenceListener();
  }

  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    this.persistThemeMode(mode);
  }

  private loadThemeMode(): ThemeMode {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored as ThemeMode;
    }
    return 'dark';
  }

  private persistThemeMode(mode: ThemeMode): void {
    localStorage.setItem(this.STORAGE_KEY, mode);
  }

  private resolveEffectiveTheme(): 'dark' | 'light' {
    const mode = this.themeMode();
    if (mode === 'dark') return 'dark';
    if (mode === 'light') return 'light';

    // system mode: use prefers-color-scheme
    if (typeof window !== 'undefined' && window.matchMedia) {
      const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDarkPreferred ? 'dark' : 'light';
    }

    return 'dark';
  }

  private applyTheme(theme: 'dark' | 'light'): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }

  private setupSystemPreferenceListener(): void {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (this.themeMode() === 'system') {
        this.effectiveTheme.set(this.resolveEffectiveTheme());
      }
    };

    mediaQuery.addEventListener('change', listener);
  }
}
