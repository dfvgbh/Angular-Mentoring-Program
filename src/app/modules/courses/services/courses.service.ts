import { Injectable } from '@angular/core';

import { courses } from './courses.mock';
import { CourseItem } from '../models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CoursesService {
  private courses: CourseItem[];

  constructor() {
    this.initializeCourses();
  }

  getCourses(): Observable<CourseItem[]> {
    return of(this.courses);
  }

  createCourse(course: CourseItem): void {
    this.courses.push(course);
  }

  getCourseById(id: number): CourseItem | undefined {
    return this.courses.find(course => course.id === id);
  }

  updateCourse(course: CourseItem): void {
    const origCourse = this.getCourseById(course.id);
    Object.assign(origCourse, course);
  }

  removeCourse(id: number): void {
    const index = this.courses.findIndex(course => course.id === id);
    if (index === -1) {
      return;
    }
    this.courses.splice(index, 1);
  }

  private initializeCourses(): void {
    this.courses = courses.map(course =>
      new CourseItem({
        ...course,
        addedDate: new Date(course.addedDate)
      }));
  }
}
