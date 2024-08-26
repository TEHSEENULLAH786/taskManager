
import { Component, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../core/interfaces/task';
import { NgFor, NgIf } from '@angular/common';
import { TaskInputComponent } from '../task-input/task-input.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../../core/services/task-service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
		NgFor,
		NgIf, 
		TaskInputComponent, 
		TaskItemComponent, 
		DragDropModule, 
		MatButtonModule, 
		MatMenuModule, 
		MatIconModule
	],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent {
	openTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  closedTasks: Task[] = [];
	dialog: MatDialog = inject(MatDialog);
	taskService: TaskService = inject(TaskService);

	showOpenTasks = true;
  showInProgressTasks = true;
  showClosedTasks = true;

  ngOnInit(): void {
    this.updateTaskLists();
  }

	updateTaskLists(): void {
		const tasks = this.taskService.getTasks();
		this.openTasks = tasks.filter(task => task.status === 'Open');
		this.inProgressTasks = tasks.filter(task => task.status === 'In Progress');
		this.closedTasks = tasks.filter(task => task.status === 'Closed');
	}
	
	toggleVisibility(status: string): void {
    switch (status) {
      case 'Open':
        this.showOpenTasks = !this.showOpenTasks;
        break;
      case 'In Progress':
        this.showInProgressTasks = !this.showInProgressTasks;
        break;
      case 'Closed':
        this.showClosedTasks = !this.showClosedTasks;
        break;
      default:
        break;
    }
  }

	isHidden(status: string): boolean {
    switch (status) {
      case 'Open':
        return !this.showOpenTasks;
      case 'In Progress':
        return !this.showInProgressTasks;
      case 'Closed':
        return !this.showClosedTasks;
      default:
        return false;
    }
  }

	openAddDialog(status: string): void {
    const dialogRef = this.dialog.open(TaskInputComponent, {
      width: '400px',
      data: { status }
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.taskService.addTask(result);
				this.updateTaskLists();
      }
    });
  }


	openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskInputComponent, {
      width: '400px',
      data: { task, status: task.status }
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.taskService.updateTask(result);
				this.updateTaskLists();
      }
    });
  }

	onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.updateTaskLists()
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = this.getStatusForContainer(event.container.id);
      this.taskService.updateTask(task);
    }
  }

  private getStatusForContainer(containerId: string): 'Open' | 'In Progress' | 'Closed' {
    switch (containerId) {
      case 'cdk-drop-list-0': return 'Open';
      case 'cdk-drop-list-1': return 'In Progress';
      case 'cdk-drop-list-2': return 'Closed';
      default: return 'Open';
    }
  }
}