import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoItemComponent} from './components/todo-item-component/todo-item-component.component';
import { AddOrEditTodoComponent } from './components/add-or-edit-todo/add-or-edit-todo.component';
import { TodoListComponent } from './components/todo-list-component/todo-list-component.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'create', component: AddOrEditTodoComponent },
  { path: 'edit/:id', component: AddOrEditTodoComponent },
  { path: 'show/:id', component: TodoItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
