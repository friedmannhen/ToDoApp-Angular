import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todos: Array<ITodo> = [];
  constructor(private todoService: TodoService) {}

  public onTodoClick(todo: ITodo, index: number): void {
    this.todoService.setSelectedTodo(todo);
    this.todos.forEach((todo) => {
      if (todo.selected) {
        todo.selected = false;
      }
    });
    this.todos[index].selected = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
