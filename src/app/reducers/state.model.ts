import { CourseItem } from '../modules/courses/models';

export interface AppState {
  authentication: {
    username: string;
    token: string;
  };
  courses: {
    totalItems: number;
    content: CourseItem[];
  };
}

export function getInitialState(): AppState {
  return {
    authentication: {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token')
    },
    courses: {
      totalItems: 0,
      content: []
    }
  };
}
