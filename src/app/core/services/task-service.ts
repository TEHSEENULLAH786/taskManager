import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 397,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Olivia Rhye',
      userInitials: 'OR',
      username: 'olivia.rhye1',
      status: 'Open'
    },
		{
      id: 398,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Kristin Watson',
      userInitials: 'KW',
      username: 'kristin123',
      status: 'Open'
    },
		{
      id: 399,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Marvin McKinney',
      userInitials: 'MM',
      username: 'marvin23',
      status: 'Open'
    },
		{
      id: 400,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Savannah Nguyen',
      userInitials: 'SN',
      username: 'savannah23',
      status: 'In Progress'
    },
		{
      id: 401,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Leslie Alexander',
      userInitials: 'LA',
      username: 'leslie3',
      status: 'In Progress'
    },
		{
      id: 402,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Albert Flores',
      userInitials: 'AF',
      username: 'albert37',
      status: 'Closed'
    },
		{
      id: 403,
      date: new Date('2022-05-12'),
      title: 'Improve cards readability',
      description: 'As a team license owner, I want to use multiplied limits',
      assignedUser: 'Darlene Robertson',
      userInitials: 'DR',
      username: 'darlane847',
      status: 'Closed'
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

	addTask(task: Task): void {
		this.tasks.push(task);
	}
	

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
