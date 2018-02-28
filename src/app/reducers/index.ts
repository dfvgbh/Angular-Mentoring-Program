import * as authenticationReducer from './authentication.reducer';
import * as coursesReducer from './courses.reducer';

export const reducers = {
  authentication: authenticationReducer.reducer,
  courses: coursesReducer.reducer
};
