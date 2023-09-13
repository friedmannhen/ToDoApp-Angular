import { Component, Input } from '@angular/core';
import { Subscription, interval, isEmpty } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent {
  constructor() {}
  @Input() set deadlineDate(deadlineDate: Date) {
    this._deadlineDate = deadlineDate;
    // console.log(deadlineDate);
  }
  private subsription: Subscription = new Subscription();
  public _deadlineDate: Date;
  private milliSecondsInASecond: number = 1000;
  private secondsInAMinute: number = 60;
  private minutesInAHour: number = 60;
  private hoursInADay: number = 24;
  public timeDiff: number;
  public progress: number;
  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;

  ngOnInit(): void {
    this.subsription.add(
      interval(1000).subscribe(() => {
        this.getTimeDiff();
        this.progress =  this.hours;
      })
    );
  }

  private getTimeDiff(): void {
    this.timeDiff =
      new Date(this._deadlineDate).getTime() - new Date().getTime();
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
