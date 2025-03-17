import { Component, AfterViewInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ServicesComponent } from '../aboutService/services.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    RippleModule,
    ContactComponent,
    AboutComponent,
    ServicesComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  showContent = false; // ✅ Ukrywamy na starcie
  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToHero();
    }, 200);

    const elements = this.el.nativeElement.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: Element) => observer.observe(el));

    // Pokaż sekcje po przewinięciu
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.showContent = true;
      }
    });
  }

  scrollToHero() {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
