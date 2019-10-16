import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as todoActions from './todo.actions';
import { createFeatureSelector, createReducer, on, createSelector } from '@ngrx/store';

export interface Todo {
  id: string;
  isDone: boolean;
}

function sortBySeqNo(e1: Todo, e2: Todo) {
  return +e1.id - +e2.id;
}

export interface State extends EntityState<Todo> {
  selectedTodoId: string;
}
export const todoAdapter = createEntityAdapter<Todo>();


const defaultTodo: State = {
  ids: ['123', '432'],
  entities: {
    '123': {
      id: '123',
      isDone: false
    },
    '432': {
      id: '432',
      isDone: true
    },
  },
  selectedTodoId: '123'
};
export const initialState: State = todoAdapter.getInitialState(defaultTodo);

// export function todoReducer(
//   state: State = initialState,
//   action: todoActions.TodoActions
// ) {
//   switch (action.type) {

//     case todoActions.CREATE:
//       return todoAdapter.addOne(action.todo, state);

//     case todoActions.UPDATE:
//       return todoAdapter.updateOne({
//         id: action.id,
//         changes: action.changes
//       }, state);

//     case todoActions.DELETE:
//       return todoAdapter.removeOne(action.id, state);

//     default:
//       return state;
//   }
// }
export const todoReducer = createReducer(
  initialState,
  on(todoActions.createTodo,
    (state, { todo }) => todoAdapter.addOne(todo, state)
  ),
  on(todoActions.updateTodo,
    (state, { id, changes }) => todoAdapter.updateOne({ id: id, changes: changes }, state)
  ),
  on(todoActions.selectTodo,
    (state, { todo }): State => {
      return {
        ...state,
        selectedTodoId: todo.id
      };
    }
  ),
  on(todoActions.deleteTodo,
    (state, { id }) => todoAdapter.removeOne(id, state)
  ),
);



export const getTodoState = createFeatureSelector<State>('todo');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = todoAdapter.getSelectors(getTodoState);

export const selectCurrentTodoId = createSelector(
  getTodoState,
  (state: State) => state.selectedTodoId
);
