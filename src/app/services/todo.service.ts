import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoModel } from 'src/models/TodoModel';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoModel[] = [];

  private readonly TODO_KEY = 'todos';

  constructor(private utilService: UtilService) {
    this.todos = this.utilService.getElementFromLocalStorage(this.TODO_KEY) || [];
  }

  getTodos(): Observable<TodoModel[]> {
    return of(this.todos);
  }

  addTodo(todo: TodoModel): void {
    this.todos.push(todo);
    this.updateLocalStorage();
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateLocalStorage();
  }

  editTodo(updatedTodo: TodoModel): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);

    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updatedTodo };
      this.updateLocalStorage();
    }
  }

  getTodoById(id: string): Observable<TodoModel | undefined> {
    const todo = this.todos.find((t) => t.id === id);
    return of(todo);
  }

  private updateLocalStorage(): void {
    this.utilService.setElementInLocalStorage(this.TODO_KEY, this.todos);
  }

}