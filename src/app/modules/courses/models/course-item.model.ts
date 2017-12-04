import { Course } from './';

export class CourseItem implements Course {
  id: number;
  title: string;
  addedDate: Date;
  duration: number;
  description: string;

}
