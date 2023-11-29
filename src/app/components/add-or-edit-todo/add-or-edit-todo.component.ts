import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/models/TodoModel';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-or-edit-todo',
  templateUrl: './add-or-edit-todo.component.html',
  styleUrls: ['./add-or-edit-todo.component.css']
})
export class AddOrEditTodoComponent {
  todo: TodoModel | undefined;
  todoForm: FormGroup;

  initializeForm() {
    this.todoForm = new FormGroup({
      title: new FormControl(this.todo?.title, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl(this.todo?.description, [Validators.required, Validators.minLength(10), Validators.maxLength(500)])
    });
  }

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    //Get todo if exist
    const todoId = this.route.snapshot.params['id'];
    if (todoId) {
      this.todoService.getTodoById(todoId).subscribe((result) => {
        this.todo = result;
      });
    }
    //Initialize form
    this.initializeForm()
  }

  onSubmit() {
    if (this.todo) {
      Swal.fire({
        icon: 'success',
        title: '¡TODO edited!',
        text: 'This TODO has been edited successfully.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/']);
      });
  
      this.todoService.editTodo({
        id: this.todo.id,
        title: this.todoForm.value.title,
        description: this.todoForm.value.description,
        completed: this.todo.completed,
      });
    } else {
      const newId = uuidv4();
      Swal.fire({
        icon: 'success',
        title: '¡TODO CREATED!',
        text: 'This TODO has been created successfully.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/']);
      });
  
      this.todoService.addTodo({
        id: newId,
        title: this.todoForm.value.title,
        description: this.todoForm.value.description,
        completed: false,
      });
    }
  
    this.todoForm.reset();
  }

}
