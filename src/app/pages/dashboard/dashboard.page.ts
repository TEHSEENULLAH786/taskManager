import { Component } from '@angular/core';
import { TaskListComponent } from "../../shared/components/task-list/task-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardComponent {

}
