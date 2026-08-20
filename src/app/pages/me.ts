import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../core/services/portfolio-data.service';
import { Profile } from '../core/models/profile.model';

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
  protected isLoading = signal(true);

  readonly techStack = ['Angular', 'TypeScript', 'Ionic', 'Java', 'Spring Boot'];

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
  }

  protected scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


