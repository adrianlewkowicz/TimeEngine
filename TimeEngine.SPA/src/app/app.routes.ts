import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/aboutService/services.component';
import { ServiceDetailComponent } from './pages/aboutService/serviceDetailComponent/service-detail.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'services', component: ServicesComponent, runGuardsAndResolvers: 'always'},
  {
    path: 'service/:title',
    loadComponent: () => import('./pages/aboutService/serviceDetailComponent/service-detail.component')
      .then(m => m.ServiceDetailComponent)
  },
  { path: '**', redirectTo: '' },
];
