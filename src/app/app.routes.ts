// app.routes.ts
import { Routes } from '@angular/router';
import { TasksComponent } from './features/tasks/tasks.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { CreateTaskComponent } from './features/create-task/create-task.component';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./features/employees/employees.component').then(m => m.EmployeesComponent)
  },
  {
    path: 'create-task',
    loadComponent: () => import('./features/create-task/create-task.component').then(m => m.CreateTaskComponent)
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks' }
];
