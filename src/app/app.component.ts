import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicComponent } from "./layouts/public/public/public.layout";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PublicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';
}
