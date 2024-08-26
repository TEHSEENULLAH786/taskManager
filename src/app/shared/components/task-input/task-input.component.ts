import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../core/interfaces/task';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-task-input',
	standalone: true,
	imports: [
		NgIf,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatInputModule,
		MatButtonModule
	],
	providers: [
		{ provide: DateAdapter, useClass: NativeDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
	],
	templateUrl: './task-input.component.html',
	styleUrl: './task-input.component.scss'
})
export class TaskInputComponent implements OnInit {
	taskForm: FormGroup;
	isEditMode = false;

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<TaskInputComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { task?: Task, status: 'Open' | 'In Progress' | 'Closed' }
	) {
		this.taskForm = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			dueDate: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		if (this.data.task) {
			this.isEditMode = true;
			this.taskForm.patchValue({
				title: this.data.task.title,
				description: this.data.task.description,
				dueDate: this.data.task.date,
			});
		}
	}

	onSubmit() {
		if (this.taskForm.valid) {
			const updatedTask: Task = {
				id: this.data.task?.id ?? Date.now(),
				title: this.taskForm.value.title,
				description: this.taskForm.value.description,
				date: new Date(this.taskForm.value.dueDate),
				status: this.data.status,
				assignedUser: this.data.task?.assignedUser ?? 'Dummy',
				userInitials: this.data.task?.userInitials ?? 'DD',
				username: this.data.task?.username ?? 'Dummy@test.com'
			};

			this.dialogRef.close(updatedTask);
		}
	}


	onCancel(): void {
		this.dialogRef.close();
	}
}
