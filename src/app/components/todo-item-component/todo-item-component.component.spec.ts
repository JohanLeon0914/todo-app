import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { of } from 'rxjs';
import { TodoItemComponent } from './todo-item-component.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    const activatedRouteMock = {
      snapshot: { params: { id: '1' } },
    };

    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodoById']);
    todoServiceSpy.getTodoById.and.returnValue(of({ id: '1', title: 'Test Todo', description: 'Test Description', completed: false }));

    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TodoService, useValue: todoServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch todo details on ngOnInit', () => {
    expect(todoServiceSpy.getTodoById).toHaveBeenCalledWith('1');
    expect(component.todo).toEqual({ id: '1', title: 'Test Todo', description: 'Test Description', completed: false });
  });

});