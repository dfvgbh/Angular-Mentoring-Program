import { Action } from '@ngrx/store';

import { getInitialState } from './state.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function reducer(state = getInitialState().authentication, action: Action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...(action as any).payload
      };

    case LOGOUT:
      return {
        ...state,
        username: '',
        token: ''
      };

    default:
      return state;
  }
}
