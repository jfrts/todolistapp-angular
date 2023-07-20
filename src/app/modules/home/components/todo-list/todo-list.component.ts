import { Component, DoCheck } from '@angular/core';
import { Task } from '../../model/task';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements DoCheck {
    public tasks: Task[];
    public openDialog: boolean;

    constructor() {
        this.openDialog = false;
        this.tasks = this.getStoredTasks();
    }

    public ngDoCheck(): void {
        this.tasks.sort(function (first, last) {
            return Number(first.completed) - Number(last.completed);
        });
    }

    public toggleTaskStatus(index: number): void {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.storeTasks(this.tasks);
    }

    public addTask(inputTitle: string): void {
        const title = inputTitle.trim();
        if (title !== "") {
            const task: Task = {
                title,
                completed: false
            }
            this.tasks.push(task);
            this.storeTasks(this.tasks);
        }
    }
    
    public updateTask(index: number, task: string) {
        this.tasks[index].title = task;
        this.storeTasks(this.tasks);
    }

    public deleteTask(index: number): void {
        this.tasks.splice(index, 1);
        this.storeTasks(this.tasks);
    }

    public deleteAllTasks(confirm: boolean): void {
        this.toggleDeleteModal();
        if (confirm) {
            this.tasks = [];
        }
        this.unstoreTasks();
    }

    private getStoredTasks(): Task[] {
        const tasks = window.localStorage.getItem("todo-app-tasks");
        if (!tasks) {
            return [];
        }
        return JSON.parse(tasks);
    }

    private storeTasks(tasks: Task[]): void {
        window.localStorage.setItem("todo-app-tasks", JSON.stringify(tasks));
    }

    private unstoreTasks(): void {
        window.localStorage.removeItem("todo-app-tasks");
    }

    public toggleDeleteModal(): void {
        this.openDialog = !this.openDialog;
    }
}