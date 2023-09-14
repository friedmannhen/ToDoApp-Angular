import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoComponent } from '../components/new-todo/new-todo.component';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
})
export class TodoComponentComponent {
  private subscription: Subscription = new Subscription();

  public todo: ITodo;
  public todos: ITodo[];

  constructor(public dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getTodos().subscribe((data) => {
        this.todos = data;
      })
    );
    this.subscription.add(
      this.todoService.getSelectedTodo().subscribe((data) => {
        this.todo = data;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(NewTodoComponent, {
      width: '600px',height:'700px'
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }
}
