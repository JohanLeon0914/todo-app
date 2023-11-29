import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/models/TodoModel';

@Component({
  selector: 'app-todo-item-component',
  templateUrl: './todo-item-component.component.html',
  styleUrls: ['./todo-item-component.component.css']
})
export class TodoItemComponent {
  todo: TodoModel | undefined;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    //Get todo if exist
    const todoId = this.route.snapshot.params['id'];
    if (todoId) {
      this.todoService.getTodoById(todoId).subscribe((result) => {
        this.todo = result;
      });
    }
  }

  getBack() {
    this.router.navigate(['/']);
  }

}
