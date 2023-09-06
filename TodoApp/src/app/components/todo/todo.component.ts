import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() set todo(todo: ITodo) {
    this._todo = todo;
    // this.descriptionLines = this._todo.description.split('\n');
  }
  private _todo: ITodo;
  get todo() {
    return this._todo;
  }
  // descriptionLines: String[];
  constructor( private todoService: TodoService) {}
  ngOnInit(): void {}

  public toggleCompleteTodo(): void {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoService.updateLocalStorage();
  }
  public onArchiveTodo(): void {
    this.todo.isArchived = !this.todo.isArchived;
    this.todoService.updateLocalStorage();
  }
  public toggleUnderline(index: number): void {
    this.todo.linesCompleted[index] = !this.todo.linesCompleted[index];
    this.todoService.updateLocalStorage();
  }
}

