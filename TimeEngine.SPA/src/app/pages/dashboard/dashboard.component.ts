import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule, NgIf, NgFor, TableModule, ButtonModule, PopoverModule, DropdownModule, TagModule]
})
export class DashboardComponent implements OnInit {
  activePage: string = 'overview';
  tasks: any[] = [];
  allUsers = [
    { name: "Jan Kowalski", role: "Developer" },
    { name: "Anna Nowak", role: "Tester" },
    { name: "Kamil Zielinski", role: "Manager" }
  ];
  selectedTask: any = null;
  selectedUser: any = null;

  workTime: string = "Ładowanie...";
  aiLearningTime: string = "Ładowanie...";
  achievements: string = "Ładowanie...";

  aiMessages = [
    "🎯 Ustal nowy cel nauki AI!",
    "📅 Zaplanuj swój tydzień na maksymalną efektywność.",
    "💡 Sprawdź najnowsze trendy w AI!",
    "🔥 Masz 3 nieukończone zadania. Może warto je skończyć?"
  ];

  aiMessage: string = this.getRandomMessage();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(title: string) {
    if (!title.trim()) return;
    this.taskService.addTask(title, 'default-project-id').subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  setActivePage(page: string) {
    this.activePage = page;
  }

  viewTaskDetails(event: any, task: any) {
    this.selectedTask = task;
    const popover = document.querySelector('#taskPopover') as any;
    popover.show(event.target);
  }

  viewUsers(event: any, task: any) {
    this.selectedTask = task;
    const popover = document.querySelector('#userPopover') as any;
    popover.show(event.target);
  }

  addUserToTask() {
    if (this.selectedTask && this.selectedUser) {
      this.selectedTask.users.push(this.selectedUser);
      this.selectedUser = null;
    }
  }

  getSeverity(status: string): "success" | "info" | "warn" | "danger" | "secondary" | "contrast" {
    switch (status) {
      case 'Nowe':
        return 'info'; // Poprawione
      case 'W trakcie':
        return 'warn'; // Poprawione
      case 'Zakończone':
        return 'success'; // Poprawione
      default:
        return 'secondary'; // Poprawione
    }
  }

  getRandomMessage(): string {
    return this.aiMessages[Math.floor(Math.random() * this.aiMessages.length)];
  }
}
