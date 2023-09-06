import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.interface';

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
  constructor() {}
  ngOnInit(): void {}

  public toggleCompleteTodo(): void {
    this.todo.isCompleted = !this.todo.isCompleted;
  }
  public onArchiveTodo(): void {
    this.todo.isArchived = !this.todo.isArchived;
  }
  public toggleUnderline(index: number): void {
    this.todo.linesCompleted[index] = !this.todo.linesCompleted[index];
  }
}

