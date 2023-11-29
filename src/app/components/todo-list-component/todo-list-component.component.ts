import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/models/TodoModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: './todo-list-component.component.html',
  styleUrls: ['./todo-list-component.component.css']
})
export class TodoListComponent {
  todos: TodoModel[] = [];
  noTodosMessage: string = 'You haven\'t created any TODOs yet. Add new ones to get started.';
  noTodosFilterMessage: string = 'You haven\'t any TODOs completed yet.'
  isFilterByCompleted: boolean = false;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  showAddForm() {
    this.router.navigate(['/create']);
  }

  showEditForm(todo: TodoModel): void {
    this.router.navigate(['/edit', todo.id]);
  }

  updateTodoCompletion(todo: TodoModel): void {
    this.todoService.editTodo(todo);
  }

  showTodoDetails(todo: TodoModel) {
    this.router.navigate(['/show', todo.id]);
  }

  deleteTodo(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(id);
        this.getTodos()
        Swal.fire({
          icon: 'success',
          title: 'TODO deleted!',
          text: 'The TODO has been deleted successfully.',
          confirmButtonText: 'OK'
        });

      }
    });
  }

  filterByCompletedTodo() {
    this.isFilterByCompleted = !this.isFilterByCompleted;
    if(this.isFilterByCompleted) {
      this.todos = this.todos.filter(todo => todo.completed);
    } else {
      this.getTodos();
    }
  }

}
