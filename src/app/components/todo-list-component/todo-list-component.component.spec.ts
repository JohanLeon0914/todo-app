import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from 'src/app/services/todo.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { TodoListComponent } from './todo-list-component.component';
import { TodoModel } from 'src/models/TodoModel';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: TodoService, useValue: jasmine.createSpyObj('TodoService', ['getTodos', 'editTodo', 'deleteTodo']) }
      ],
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTodos on ngOnInit', () => {
    const mockTodos: TodoModel[] = [
      { id: '1', title: 'Todo 1', completed: false, description: 'Description 1' },
      { id: '2', title: 'Todo 2', completed: true, description: 'Description 2' },
    ];

    todoService.getTodos.and.returnValue(of(mockTodos));

    component.ngOnInit();

    expect(component.todos).toEqual(mockTodos);
  });

});