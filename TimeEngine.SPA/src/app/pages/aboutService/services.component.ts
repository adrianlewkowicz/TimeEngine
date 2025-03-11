import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      title: 'Aplikacje Webowe',
      description: 'Tworzymy nowoczesne i wydajne strony internetowe oraz systemy webowe.',
      image: '/assets/images/web-dev.jpg'
    },
    {
      title: 'Aplikacje Desktopowe',
      description: 'Tworzymy aplikacje dla Windows, Mac i Linux dostosowane do Twoich potrzeb.',
      image: '/assets/images/desktop.jpg'
    },
    {
      title: 'Chmura (AWS, Azure, GCP)',
      description: 'Wdrażamy i zarządzamy infrastrukturą chmurową w oparciu o najnowsze technologie.',
      image: '/assets/images/cloud.jpg'
    },
    {
      title: 'Aplikacje Mobilne',
      description: 'Tworzymy aplikacje na iOS i Androida, które angażują użytkowników.',
      image: '/assets/images/mobile.jpg'
    }
  ];
}

