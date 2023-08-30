import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  private subsription: Subscription = new Subscription();
  public todos: Array<ITodo> = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subsription.add(
      this.todoService.getTodos().subscribe((data) => {
        this.todos = data;
      })
    );
  }

  ngOnDestroy(): void {}
}
