import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  language = 'pl';

  items: MenuItem[] = [];

  constructor() {
    this.setLanguage(this.language);
  }

  setLanguage(lang: string) {
    this.language = lang;
    this.items = [
      {
        label: lang === 'pl' ? 'Strona Główna' : 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: lang === 'pl' ? 'O nas' : 'About',
        icon: 'pi pi-info',
        routerLink: '/about'
      },
      {
        label: lang === 'pl' ? 'Usługi' : 'Services',
        icon: 'pi pi-cog',
        items: [
          {
            label: lang === 'pl' ? 'Tworzenie stron' : 'Web Development',
            icon: 'pi pi-code',
            routerLink: '/services/web'
          },
          {
            label: lang === 'pl' ? 'Optymalizacja SEO' : 'SEO Optimization',
            icon: 'pi pi-chart-line',
            routerLink: '/services/seo'
          }
        ]
      },
      {
        label: lang === 'pl' ? 'Kontakt' : 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact'
      }
    ];
  }
}
