import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../core/interfaces/task';
import { DatePipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../../core/services/task-service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [DatePipe, NgIf, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();
	
	dialog: MatDialog = inject(MatDialog);
	taskService: TaskService = inject(TaskService);

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }	
	
	onEdit(): void {
    this.editTask.emit(this.task);
  }
	
}
