import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MenubarModule, RouterModule, ButtonModule]
})
export class NavbarComponent {
  items = [
    {
      label: 'TimeEngineApp',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Zadania',
      icon: 'pi pi-list',
      routerLink: '/tasks'
    },
    {
      label: 'Pracownicy',
      icon: 'pi pi-users',
      routerLink: '/employees'
    }
  ];
}
