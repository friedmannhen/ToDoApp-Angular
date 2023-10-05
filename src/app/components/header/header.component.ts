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
  public exporLoaclStorage(): void {
    this.todoService.exportAndDownloadLocalStorage();
  }
  public uploadJson(): void {
   
    if (!confirm( 'This action will override ALL current data... \nAre you sure you want to do that?'))return;

    const hiddenFileInput = document.createElement('input');
    hiddenFileInput.type = 'file';
    hiddenFileInput.style.display = 'none';
    document.body.appendChild(hiddenFileInput);

    hiddenFileInput.addEventListener('change', (event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        this.todoService.importFileAndSetLocalStorage(selectedFile);
      }
      // Remove the hidden file input from the DOM
      document.body.removeChild(hiddenFileInput);
    });

    hiddenFileInput.click();
  }
}
