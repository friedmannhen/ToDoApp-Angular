import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}
  private todos: Array<ITodo> = [];
  private themeType: string = 'light';
  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(
    this.todos
  );
  private _singleTodoSubject: BehaviorSubject<ITodo> = new BehaviorSubject(
    null
  );
  private _activeTheme: BehaviorSubject<string> = new BehaviorSubject(
    this.themeType
  );

  public getTodos(): Observable<Array<ITodo>> {
    if (!this._todoSubject.value.length) {
      const todoString = localStorage.getItem('todos');
      if (todoString) {
        const existingTodos: Array<ITodo> = JSON.parse(todoString);
        existingTodos.forEach((todo) => {
          if (todo.selected) {
            todo.selected = false;
          }
        });
        existingTodos[0].selected = true;
        this._todoSubject.next(existingTodos);
        // this._singleTodoSubject.next(existingTodos[0]); // set first item to be displayed on init
      }
    }
    return this._todoSubject.asObservable();
  }

  public getSelectedTodo(): Observable<ITodo> {
    return this._singleTodoSubject.asObservable();
  }

  public setSelectedTodo(todo: ITodo): void {
    this._singleTodoSubject.next(todo);
  }
  public addNewTodo(newTodo: ITodo): void {
    const existingTodos: Array<ITodo> = this._todoSubject.value;
    existingTodos.push(newTodo);
    this._todoSubject.next(existingTodos);
    this.updateLocalStorage();
  }

  public updateTodo(updatedTodo: ITodo): void {
    const existingTodos: Array<ITodo> = this._todoSubject.value;
    const index = existingTodos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      existingTodos[index] = { ...existingTodos[index], ...updatedTodo };
      this._todoSubject.next(existingTodos);
      this.updateLocalStorage();
      this.setSelectedTodo(updatedTodo);
    }
  }

  public removePermenantly(TodoToRemove: ITodo): void {
    const existingTodos: Array<ITodo> = this._todoSubject.value;
    const index: number = existingTodos.indexOf(TodoToRemove);
    existingTodos.splice(index, 1);
    this._todoSubject.next(existingTodos);
    if (existingTodos.length) {
      this.updateLocalStorage();
    } else {
      localStorage.clear();
    }
  }
  public updateLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this._todoSubject.value));
  }

  public getThemeType(): Observable<string> {
    return this._activeTheme.asObservable();
  }

  public toggleTheme(themeType: string): void {
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('grey-theme');
    if (themeType == 'dark') {
      document.body.classList.add('dark-theme');
    } else if (themeType == 'grey') {
      document.body.classList.add('grey-theme');
    }
    this._activeTheme.next(themeType);
    localStorage.setItem('theme', this._activeTheme.value);
  }
  private startingTheme: string;
  public setStartingTheme(): void {
    this.startingTheme = localStorage.getItem('theme');
    if (this.startingTheme) {
      this.toggleTheme(this.startingTheme);
    }
  }

  public exportAndDownloadLocalStorage() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorageData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  public importFileAndSetLocalStorage(inputFile: File): void {
    const fileReader = new FileReader();
    
    fileReader.onload = function (event: any): void {
      const importedData: string = event.target.result;

      try {
        const parsedData: Record<string, any> = JSON.parse(importedData);
        if (!('todos' in parsedData)) {
          throw new Error('Missing "todo" key in the JSON file.');
        }
        for (const key in parsedData) {
          if (parsedData.hasOwnProperty(key)) {
            localStorage.setItem(key, parsedData[key]);
          }
        }

        console.log('Imported data into local storage.');
        location.reload();
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        alert(
          'Not a valid JSON file Or the JSON file does not contains the right data'
        );
      }
    };

    fileReader.readAsText(inputFile);
  }
}
