import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) {}
  public isChecked: boolean = false;
  public activetheme: string;
  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getThemeType().subscribe((data) => {
        this.activetheme = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public toggleTheme(themeType: string): void {
    this.todoService.toggleTheme(themeType);
  }
}
