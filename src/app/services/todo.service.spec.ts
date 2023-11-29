import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { UtilService } from './util.service';
import { of } from 'rxjs';
import { TodoModel } from 'src/models/TodoModel';

describe('TodoService', () => {
  let todoService: TodoService;
  let utilService: jasmine.SpyObj<UtilService>;

  beforeEach(() => {
    // Configura el servicio y sus dependencias
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: UtilService, useValue: jasmine.createSpyObj('UtilService', ['getElementFromLocalStorage', 'setElementInLocalStorage']) },
      ],
    });

    // Obtiene una instancia del servicio y sus dependencias espiadas
    todoService = TestBed.inject(TodoService);
    utilService = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should add todo', () => {
    const mockTodo: TodoModel = { id: '1', title: 'Todo 1', completed: false, description: 'Description 1' };

    todoService.addTodo(mockTodo);

    expect(todoService['todos']).toContain(mockTodo);
    expect(utilService.setElementInLocalStorage).toHaveBeenCalledWith(todoService['TODO_KEY'], todoService['todos']);
  });
  
  it('should add todo', () => {
    const mockTodo: TodoModel = { id: '1', title: 'Todo 1', completed: false, description: 'Description 1' };
  
    todoService.addTodo(mockTodo);
  
    expect(todoService['todos']).toContain(mockTodo);
    expect(utilService.setElementInLocalStorage).toHaveBeenCalledWith(todoService['TODO_KEY'], todoService['todos']);
  });

  it('should get todo by ID', () => {
    const mockTodo: TodoModel = { id: '1', title: 'Todo 1', completed: false, description: 'Description 1' };
    todoService['todos'] = [mockTodo];
  
    todoService.getTodoById('1').subscribe(todo => {
      expect(todo).toEqual(mockTodo);
    });
  });

});