import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent {
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChild('f') form: NgForm;
  public minDate = new Date();
  public isChecked: boolean = false;
  public isDark: boolean;
  public selectedDate: Date | null;
  //dark theme for time picker
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff',
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff',
    },
  };
  ngOnInit(): void {
    console.log(this.todoService.getThemeType());
    this.isDark = this.todoService.getThemeType() != 'light' ? true : false;
  }
  public handleDateSelection(selectedDate: any): void {
    this.selectedDate = selectedDate;
  }
  public onNewTodoSubmit() {
    if (!this.form.valid) {
      return;
    }
    const formValues = this.form.value;
    const newTodo: ITodo = {
      id: uuidv4(),
      title: formValues.title,
      openDate: new Date(),
      descriptionLines: formValues.description.split('\n'),
      linesCompleted: Array.from(
        { length: formValues.description.split('\n').length },
        () => false
      ),
      endDate: formValues.date == '' ? null : formValues.date,
      endTime: formValues.time,
      isCompleted: false,
      isArchived: false,
      selected: false,
      timesOver: false,
    };
    this.todoService.addNewTodo(newTodo);
    this.dialog.closeAll();
    this._snackBar.open('New Todo Added!', 'close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }
}
