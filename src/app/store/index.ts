import { ActionReducerMap } from '@ngrx/store';
import { todoReducer, State } from './todo.reducer';

export interface AppState {
  todo: State
}

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer
};
