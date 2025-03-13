import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/aboutService/services.component';
import { ServiceDetailComponent } from './pages/aboutService/serviceDetailComponent/service-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
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
