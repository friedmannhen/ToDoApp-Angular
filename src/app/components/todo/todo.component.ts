import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  private subscription: Subscription = new Subscription();

  @Input() set todo(todo: ITodo) {
    this._todo = todo;
  }
  private _todo: ITodo;
  get todo() {
    return this._todo;
  }
  constructor(private todoService: TodoService, public dialog: MatDialog) {}
  public activetheme: string;

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getThemeType().subscribe((data) => {
        this.activetheme = data;
        console.log(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public toggleCompleteTodo(): void {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoService.updateLocalStorage();
  }
  public onArchiveTodo(): void {
    this.todo.isArchived = !this.todo.isArchived;
    this.todoService.updateLocalStorage();
  }
  public togglelineComplete(index: number): void {
    this.todo.linesCompleted[index] = !this.todo.linesCompleted[index];
    this.todoService.updateLocalStorage();
  }
  public toggleAlllineComplete(): void {
    for (let index = 0; index < this.todo.linesCompleted.length; index++) {
      this.todo.linesCompleted[index] = true;
    }
    this.todoService.updateLocalStorage();
  }
  public toggleAlllineUnComplete(): void {
    for (let index = 0; index < this.todo.linesCompleted.length; index++) {
      this.todo.linesCompleted[index] = false;
    }
    this.todoService.updateLocalStorage();
  }
  public PermenantlyDelete(): void {
    this.todoService.removePermenantly(this.todo);
    this.todo = null;
  }
  public openDialog(): void {
    const dialogRef = this.dialog.open(EditTodoComponent, {
    width: '900px',height:'700px',data:this.todo
    });
  }
}
