import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isLoaded = false;
  countdown = 3;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.isLoaded = true;
      }
    }, 1000);
  }

  navigateTo(route: string) {
    this.isLoaded = false;
    setTimeout(() => {
      this.router.navigate([route]);
    }, 500);
  }
}
