import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterModule, ButtonModule, NgIf]
})
export class NavbarComponent {
  isLoggedIn = false;

  get items() {
    return [
      { label: 'Strona Główna', icon: 'pi pi-home', routerLink: '/' },
      ...(this.isLoggedIn ? [
        { label: 'Zadania', icon: 'pi pi-list', routerLink: '/tasks' },
        { label: 'Pracownicy', icon: 'pi pi-users', routerLink: '/employees' }
      ] : [])
    ];
  }
}
