import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router'; // ✅ Ważne!
import { Service } from './serviceDetailComponent/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CardModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit {
  service!: Service;
  selectedStep: any = null;

  services = [
    { title: 'Aplikacje Webowe', description: 'Nowoczesne i wydajne strony.', image: '/assets/images/web-dev.jpg' },
    { title: 'Aplikacje Desktopowe', description: 'Dla Windows, Mac i Linux.', image: '/assets/images/desktop.jpg' },
    { title: 'Chmura (AWS, Azure, GCP)', description: 'Wdrażamy chmurę dla firm.', image: '/assets/images/cloud.jpg' },
    { title: 'Aplikacje Mobilne', description: 'iOS i Android z nowoczesnym UX.', image: '/assets/images/mobile.jpg' }
  ];

  ngAfterViewInit() {
    this.scrollToLastViewedService();
  }

  encodeTitle(title: string): string {
    return title
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[(),]/g, '')
      .toLowerCase();
  }


  showDetail(step: any) {
    this.selectedStep = step;
    setTimeout(() => (this.selectedStep = null), 3000);
  }

  navigateToService(service: any) {
    localStorage.setItem('lastViewedService', service.title);
    localStorage.setItem('lastViewedServiceUrl', window.location.pathname);
  }


  scrollToLastViewedService() {
    setTimeout(() => {
      const lastViewedService = localStorage.getItem('lastViewedService');
      if (lastViewedService) {
        requestAnimationFrame(() => {
          const element = document.querySelector(`[data-title="${lastViewedService}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    }, 500);
  }

}
