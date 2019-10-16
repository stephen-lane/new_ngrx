import { Action, createAction, props } from '@ngrx/store';
import { Todo } from './todo.reducer';

// export const CREATE = '[Todo-list] Create';
// export const UPDATE = '[Todo-list] Update';
// export const DELETE = '[Todo-list] Delete';

// export class Create implements Action {
//   readonly type = CREATE;
//   constructor(public todo: Todo) { }
// }

// export class Update implements Action {
//   readonly type = UPDATE;
//   constructor(
//     public id: string,
//     public changes: Partial<Todo>
//   ) { }
// }

// export class Delete implements Action {
//   readonly type = DELETE;
//   constructor(public id: string) { }
// }
export const createTodo = createAction(
  '[Todo list] Create',
  props<{todo: Todo}>()
);
export const updateTodo = createAction(
  '[Todo list] Update',
  props<{id: string, changes: Partial<Todo>}>()
);
export const selectTodo = createAction(
  '[Todo list] Select',
  props<{todo: Todo}>()
);
export const deleteTodo = createAction(
  '[Todo list] Delete',
  props<{id: string}>()
);

// export type TodoActions =
//   Create |
//   Update |
//   Delete;
