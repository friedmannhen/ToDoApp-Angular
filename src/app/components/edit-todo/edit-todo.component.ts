import { Component, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.todo = data;
    this.descriptionLines = this.todo.descriptionLines.join('\n');
  }
  @ViewChild('f') form: NgForm;
  public minDate = new Date();
  public isChecked: boolean = false;
  public isDark: boolean;
  public selectedDate: boolean = false;
  public todo: ITodo;
  public descriptionLines: string;

  ngOnInit(): void {
    this.isDark = this.todoService.getThemeType() != 'light' ? true : false;
    if(this.data.endDate) this.selectedDate = true;
  }
  public handleDateSelection(selectedDate: any): void {
    this.selectedDate = true;
  }
  public onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const formValues = this.form.value;
    const updatedTodo: ITodo = {
      id: this.data.id,
      title: formValues.title,
      openDate: this.data.openDate,
      descriptionLines: formValues.description.split('\n'),
      linesCompleted:this.data.linesCompleted,
      endDate: formValues.date == '' ? null : formValues.date,
      endTime: formValues.time,
      isCompleted: this.data.isCompleted,
      isArchived: this.data.isArchived,
      selected: this.data.selected,
      timesOver: this.data.timesOver,
    };
    this.todoService.updateTodo(updatedTodo);
    this.dialog.closeAll();
    this._snackBar.open('Todo has been updated!', 'close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }
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
}
