import { Component, Input } from '@angular/core';
import { Subscription, interval, isEmpty } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent {
  constructor(private todoService: TodoService) {}
  @Input() set todo(todo: ITodo) {
    this._todo = todo;
  }
  private subsription: Subscription = new Subscription();
  public _todo: ITodo;
  private milliSecondsInASecond: number = 1000;
  private secondsInAMinute: number = 60;
  private minutesInAHour: number = 60;
  private hoursInADay: number = 24;
  private deadlineTime: number;
  public timeDiff: number;
  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;
  public timesOver: boolean = false;
  public millisecondsPerHour: number = 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
  public millisecondsPerMinute: number = 60 * 1000; // 1 minute = 60 seconds * 1000 milliseconds

  ngOnInit(): void {
    this.deadlineTime = this.timeToMilliseconds(this._todo.endTime);
    this.subsription.add(
      interval(1000).subscribe(() => {
        this.getTimeDiff();
      })
    );
  }
  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
  private timeToMilliseconds(timeString: string): number {
    if (timeString == '' || !timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMilliseconds =
      hours * this.millisecondsPerHour + minutes * this.millisecondsPerMinute;
    return totalMilliseconds;
  }

  private getTimeDiff(): void {
    this.timeDiff =
      new Date(this._todo.endDate).getTime() +
      this.deadlineTime -
      new Date().getTime();
    if (this.timeDiff <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.timesOver = true;
      return;
    }
    this.setTimeUnits(this.timeDiff);
  }
  private setTimeUnits(timeDiff: number) {
    this.seconds = Math.floor(
      (timeDiff / this.milliSecondsInASecond) % this.secondsInAMinute
    );
    this.minutes = Math.floor(
      (timeDiff / (this.milliSecondsInASecond * this.secondsInAMinute)) %
        this.minutesInAHour
    );
    this.hours = Math.floor(
      (timeDiff /
        (this.milliSecondsInASecond *
          this.secondsInAMinute *
          this.minutesInAHour)) %
        this.hoursInADay
    );
    this.days = Math.floor(
      timeDiff /
        (this.milliSecondsInASecond *
          this.secondsInAMinute *
          this.minutesInAHour *
          this.hoursInADay)
    );
  }
}
