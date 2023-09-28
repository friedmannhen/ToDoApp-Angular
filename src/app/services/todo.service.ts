import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}
  private todos: Array<ITodo> = [];
  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(
    this.todos
  );
  private _singleTodoSubject: BehaviorSubject<ITodo> = new BehaviorSubject(
    null
  );
  private themeType: string = 'light';

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
  public updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this._todoSubject.value));
  }

  public getThemeType(): string {
    return this.themeType;
  }

  toggleTheme(themeType: string) {
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('grey-theme');
    if (themeType == 'dark') {
      document.body.classList.add('dark-theme');
    } else if (themeType == 'grey') {
      document.body.classList.add('grey-theme');
    }
    this.themeType=themeType;

  }
}
