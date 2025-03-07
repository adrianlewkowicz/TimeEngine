// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/landing-page/landing-page.module')
      .then(m => m.LandingPageModule)
  },
  {
    path: 'tasks',
    loadComponent: () => import('../features/tasks/tasks.component')
      .then(m => m.TasksComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('../features/employees/employees.component')
      .then(m => m.EmployeesComponent)
  },
  {
    path: 'create-task',
    loadComponent: () => import('../features/create-task/create-task.component')
      .then(m => m.CreateTaskComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('../features/auth/pages/login/login.module')
    .then(m => m.LoginModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
