import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('../features/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('../features/employees/employees.component').then(m => m.EmployeesComponent)
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
