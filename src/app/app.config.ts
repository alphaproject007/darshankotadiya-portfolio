import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  ArrowRight,
  ArrowUp,
  Code,
  Database,
  Download,
  Eye,
  ExternalLink,
  Github,
  Layers2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Moon,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  X,
  Zap,
  LucideAngularModule
} from 'lucide-angular';
import { routes } from './app.routes';
import { ThemeService } from './core/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    ThemeService,
    importProvidersFrom(
      LucideAngularModule.pick({
        ArrowRight,
        ArrowUp,
        Code,
        Database,
        Download,
        Eye,
        ExternalLink,
        Github,
        Layers2,
        Linkedin,
        Mail,
        MapPin,
        Menu,
        Network,
        Moon,
        Server,
        Shield,
        Smartphone,
        Sparkles,
        Sun,
        X,
        Zap
      })
    )
  ]
};
