import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent {
  constructor(private todoService: TodoService) {}
  @ViewChild('f') form: NgForm;
  ngOnInit(): void {}

  public onNewTodoSubmit() {
    if (!this.form.valid) {
      return;
    }
    const formValues = this.form.value;
    const newTodo: ITodo = {
      id: 1111,
      title: formValues.title,
      openDate: new Date(),
      description: formValues.description,
      endDate: formValues.date,
      isCompleted: false,
      isArchived: false,
      selected: false,
    };
    this.todoService.addNewTodo(newTodo);
    console.log('Submited');
    console.log(this.form);
  }
}
