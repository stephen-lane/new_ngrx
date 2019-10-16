import { Component, OnInit } from '@angular/core';
import * as fromTodo from '../../store/todo.reducer';
import * as todoActions from '../../store/todo.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit {

  public todos$: Observable<fromTodo.Todo[]>;
  public todoId$: Observable<string>;

  constructor(
    private store: Store<fromTodo.State>
  ) { }

  ngOnInit() {
    this.todos$ = this.store.pipe(select(fromTodo.selectAll));
    this.todoId$ = this.store.pipe(select(fromTodo.selectCurrentTodoId));
  }

  createTodo() {
    const todo: fromTodo.Todo = {
      id: new Date().getUTCMilliseconds().toString(),
      isDone: false
    }

    this.store.dispatch( todoActions.createTodo({todo: todo}) );
  }

  updateTodo(id: string, isDone: boolean) {
    this.store.dispatch( todoActions.updateTodo({id: id, changes: { isDone: isDone }}) );
  }

  deleteTodo(id: string) {
    this.store.dispatch( todoActions.deleteTodo({id: id}) );
  }

  selectId(todo: fromTodo.Todo) {
    this.store.dispatch( todoActions.selectTodo({todo: todo}) );
  }

}
