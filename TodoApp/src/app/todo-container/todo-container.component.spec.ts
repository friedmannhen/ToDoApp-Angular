import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponentComponent } from './todo-container.component';

describe('TodoComponentComponent', () => {
  let component: TodoComponentComponent;
  let fixture: ComponentFixture<TodoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponentComponent]
    });
    fixture = TestBed.createComponent(TodoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
