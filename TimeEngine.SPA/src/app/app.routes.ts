import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

// 🔹 Definiujemy trasy
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },

  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'services', loadComponent: () => import('./pages/aboutService/services.component').then(m => m.ServicesComponent), runGuardsAndResolvers: 'always' },
  {
    path: 'service/:title',
    loadComponent: () => import('./pages/aboutService/serviceDetailComponent/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  { path: 'settings', loadComponent: () => import('./pages/dashboard/settings/settings.component').then(m => m.SettingsComponent), canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/login' }
];
