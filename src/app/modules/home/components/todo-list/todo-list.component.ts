import { Component } from '@angular/core';
import { Task } from '../../model/task';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
    public tasks: Task[];
    public openDialog: boolean;

    constructor() {
        this.openDialog = false;
        this.tasks = [];
        this.tasks.push({ title: "Minha Tarefa 1", completed: false });
        this.tasks.push({ title: "Minha Tarefa 2", completed: true });
        this.tasks.push({ title: "Minha Tarefa 3", completed: false });
    }

    public toggleTaskStatus(index: number): void {
        this.tasks[index].completed = !this.tasks[index].completed; 
    }

    public deleteTask(index: number): void {
        this.tasks.splice(index, 1);
    }

    public toggleDeleteModal(): void {
        this.openDialog = !this.openDialog;
    }

    public deleteAllTasks(confirm: boolean): void {
        this.toggleDeleteModal();
        if (confirm) {
            this.tasks = [];
        }
    }
}