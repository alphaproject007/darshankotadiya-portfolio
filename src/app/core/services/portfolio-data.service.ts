import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Profile } from '../models/profile.model';
import { Experience } from '../models/experience.model';
import { Project } from '../models/project.model';
import { Skills } from '../models/skills.model';
import { Sections } from '../models/sections.model';
import { Social } from '../models/social.model';
import { SiteConfig } from '../models/site-config.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private readonly http = inject(HttpClient);
  private readonly dataPath = '/data';

  private profile$: Observable<Profile> | null = null;
  private experiences$: Observable<Experience[]> | null = null;
  private projects$: Observable<Project[]> | null = null;
  private skills$: Observable<Skills> | null = null;
  private sections$: Observable<Sections> | null = null;
  private social$: Observable<Social> | null = null;
  private siteConfig$: Observable<SiteConfig> | null = null;

  getProfile(): Observable<Profile> {
    if (!this.profile$) {
      this.profile$ = this.http.get<Profile>(`${this.dataPath}/profile.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load profile.json');
          return of({
            name: 'Darshan Kotadiya',
            title: 'Full-Stack Software Engineer',
            bio: '',
            email: '',
            location: ''
          });
        })
      );
    }
    return this.profile$;
  }

  getExperiences(): Observable<Experience[]> {
    if (!this.experiences$) {
      this.experiences$ = this.http.get<Experience[]>(`${this.dataPath}/experience.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load experience.json');
          return of([]);
        })
      );
    }
    return this.experiences$;
  }

  getProjects(): Observable<Project[]> {
    if (!this.projects$) {
      this.projects$ = this.http.get<Project[]>(`${this.dataPath}/projects.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load projects.json');
          return of([]);
        })
      );
    }
    return this.projects$;
  }

  getSkills(): Observable<Skills> {
    if (!this.skills$) {
      this.skills$ = this.http.get<Skills>(`${this.dataPath}/skills.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load skills.json');
          return of({ categories: [] });
        })
      );
    }
    return this.skills$;
  }

  getSections(): Observable<Sections> {
    if (!this.sections$) {
      this.sections$ = this.http.get<Sections>(`${this.dataPath}/sections.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load sections.json');
          return of({ sectionConfigs: {} });
        })
      );
    }
    return this.sections$;
  }

  getSocial(): Observable<Social> {
    if (!this.social$) {
      this.social$ = this.http.get<Social>(`${this.dataPath}/social.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load social.json');
          return of({ links: [] });
        })
      );
    }
    return this.social$;
  }

  getSiteConfig(): Observable<SiteConfig> {
    if (!this.siteConfig$) {
      this.siteConfig$ = this.http.get<SiteConfig>(`${this.dataPath}/site.json`).pipe(
        shareReplay(1),
        catchError(() => {
          console.warn('Failed to load site.json');
          return of({
            title: 'Darshan Kotadiya - Full-Stack Engineer',
            description: 'Professional portfolio',
            baseUrl: ''
          });
        })
      );
    }
    return this.siteConfig$;
  }

  getAllData(): Observable<{
    profile: Profile;
    experiences: Experience[];
    projects: Project[];
    skills: Skills;
    sections: Sections;
    social: Social;
    siteConfig: SiteConfig;
  }> {
    return forkJoin({
      profile: this.getProfile(),
      experiences: this.getExperiences(),
      projects: this.getProjects(),
      skills: this.getSkills(),
      sections: this.getSections(),
      social: this.getSocial(),
      siteConfig: this.getSiteConfig()
    });
  }
}
