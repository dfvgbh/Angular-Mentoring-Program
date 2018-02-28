import { Action } from '@ngrx/store';

import { getInitialState } from './state.model';

export const SET_COURSES = 'SET_COURSES';

export function reducer(state = getInitialState().courses, action: Action) {
  switch (action.type) {
    case SET_COURSES:
      return {
        ...state,
        ...(action as any).payload
      };

    default:
      return state;
  }
}
