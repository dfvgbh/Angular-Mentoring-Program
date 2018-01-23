import { CourseItem } from './course-item.model';

export interface CoursesResponseParams {
  totalItems: number;
  content: CourseItem[];
}
