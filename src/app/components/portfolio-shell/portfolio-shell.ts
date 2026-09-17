import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-portfolio-shell',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './portfolio-shell.html',
  styleUrl: './portfolio-shell.scss'
})
export class PortfolioShellComponent {}
