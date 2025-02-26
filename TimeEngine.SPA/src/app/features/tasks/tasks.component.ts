import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

export interface Task {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonModule, PaginatorModule]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  paginatedTasks: Task[] = [];

  itemsPerPage: number = 5;
  totalTasks: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get<Task[]>('tasks').subscribe((data: Task[]) => {
      this.tasks = data.map((task, index) => ({
        ...task,
        codeSnippet: `console.log("Kod dla zadania ${task.title}");`
      }));
      this.totalTasks = this.tasks.length;
      this.updatePaginatedTasks(0);
    });
  }

  updatePaginatedTasks(page: number) {
    const startIndex = page * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  startTask(taskId: string) {
    console.log(`Start task: ${taskId}`);
  }

  submitTask(taskId: string) {
    console.log(`Submit task: ${taskId}`);
  }
}
