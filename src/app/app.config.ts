import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
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
  House,
  Layers2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MonitorSmartphone,
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
        Briefcase,
        ClipboardList,
        Code,
        Database,
        Download,
        ExternalLink,
        Gauge,
        Github,
        House,
        Layers2,
        Linkedin,
        Mail,
        MapPin,
        Menu,
        MonitorSmartphone,
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
