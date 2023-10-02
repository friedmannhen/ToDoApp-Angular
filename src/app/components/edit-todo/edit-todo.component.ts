import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  private subscription: Subscription = new Subscription();

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
  public activeTheme: string;
  public selectedDate: boolean = false;
  public todo: ITodo;
  public descriptionLines: string;


  //testing
  @ViewChild('lineIconsContainer') lineIconsContainer: ElementRef;

  ngAfterViewInit() {
    this.updateLineIcons();
  }

  updateLineIcons() {
    const lines = this.descriptionLines.split('\n');
    const iconsHTML = lines.map(() => '<svg style="fill:#6a8aff" height="24" viewBox="0 -960 960 960" width="24"><path d="m120-200 180-280-180-280h480q20 0 37.5 9t28.5 25l174 246-174 246q-11 16-28.5 25t-37.5 9H120Zm146-80h334l142-200-142-200H266l130 200-130 200Zm130-200L266-680l130 200-130 200 130-200Z"/></svg>').join('');
    this.lineIconsContainer.nativeElement.innerHTML = iconsHTML;
  }
  //testing




  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getThemeType().subscribe((data) => {
        this.activeTheme = data;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
