import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input-add-items',
  templateUrl: './todo-input-add-items.component.html',
})
export class TodoInputAddItemsComponent {
    @Output()
    public emitTaskEvent: EventEmitter<string>;
    public taskToEmit: string;

    constructor() {
        this.emitTaskEvent = new EventEmitter();
        this.taskToEmit = "";
    }

    public emitTask(task: string) {
        this.emitTaskEvent.emit(this.taskToEmit);
        this.taskToEmit = "";
    }
}
