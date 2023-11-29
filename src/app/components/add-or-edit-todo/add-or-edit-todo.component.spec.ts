import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { AddOrEditTodoComponent } from './add-or-edit-todo.component';
import { of } from 'rxjs';
import { TodoModel } from 'src/models/TodoModel';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddOrEditTodoComponent', () => {
  let component: AddOrEditTodoComponent;
  let fixture: ComponentFixture<AddOrEditTodoComponent>;
  let route: ActivatedRoute;
  let todoService: jasmine.SpyObj<TodoService>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditTodoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: TodoService, useValue: jasmine.createSpyObj('TodoService', ['getTodoById', 'editTodo', 'addTodo']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    });

    fixture = TestBed.createComponent(AddOrEditTodoComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.todo = { id: '1', title: 'Todo 1', description: 'Description 1', completed: false };
    component.initializeForm();

    expect(component.todoForm.value.title).toEqual('Todo 1');
    expect(component.todoForm.value.description).toEqual('Description 1');
  });

  it('should call getTodoById and initialize form when todoId exists', () => {
    const mockTodo: TodoModel = { id: '1', title: 'Todo 1', description: 'Description 1', completed: false };
    route.snapshot.params = { id: '1' };
    todoService.getTodoById.and.returnValue(of(mockTodo));

    component.ngOnInit();

    expect(todoService.getTodoById).toHaveBeenCalledWith('1');
    expect(component.todo).toEqual(mockTodo);
    expect(component.todoForm.value.title).toEqual('Todo 1');
    expect(component.todoForm.value.description).toEqual('Description 1');
  });

});
