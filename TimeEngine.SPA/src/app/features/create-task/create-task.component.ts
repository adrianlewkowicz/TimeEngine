import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../core/api.service';
import { Task } from './Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectModule, DropdownModule, ButtonModule]
})
export class CreateTaskComponent {
  task: Task = {
    id: '',
    title: '',
    description: '',
    skills: [],
    projectId: '',
    status: 0, // Nowe zadanie
    estimationJunior: 0,
    estimationMid: 0,
    estimationSenior: 0
  };

  skillsOptions = [
    { label: 'Junior', value: 'Junior' },
    { label: 'Mid', value: 'Mid' },
    { label: 'Senior', value: 'Senior' }
  ];

  projectsOptions = [
    { label: 'Projekt A', value: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
    { label: 'Projekt B', value: '3fa85f64-5717-4562-b3fc-2c963f66afa7' }
  ];

  constructor(private apiService: ApiService) {}

  createTask() {
    if (!this.task.title || !this.task.description || !this.task.projectId) {
        console.warn('Wszystkie pola są wymagane!');
        return;
    }

    console.log('📤 Dane wysyłane do API:', JSON.stringify(this.task, null, 2));

    // Usuwamy pole `id` z obiektu przed wysłaniem do API
    const { id, ...taskWithoutId } = this.task;

    this.apiService.createTask(taskWithoutId as Task).subscribe({
        next: (response) => console.log('✅ Zadanie utworzone!', response),
        error: (error) => console.error('❌ Błąd przy tworzeniu zadania:', error)
    });
  }
}
