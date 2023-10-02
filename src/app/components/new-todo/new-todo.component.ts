import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent {
  private subscription: Subscription = new Subscription();

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChild('f') form: NgForm;
  public minDate = new Date();
  public isChecked: boolean = false;
  public activeTheme: string;
  public selectedDate: Date | null;

  //testing
  @ViewChild('lineIconsContainer') lineIconsContainer: ElementRef;
  description: string = '';

  ngAfterViewInit() {
    this.updateLineIcons();
  }

  updateLineIcons() {
    const lines = this.description.split('\n');
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
