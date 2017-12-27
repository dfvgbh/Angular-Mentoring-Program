import { Injectable } from '@angular/core';

import { courses } from './courses.mock';
import { CourseItem } from '../models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CoursesService {
  private courses: CourseItem[];
  private coursesSubject: BehaviorSubject<CourseItem[]>;

  constructor() {
    this.initializeCourses();
    this.coursesSubject = new BehaviorSubject(this.courses);
  }

  getCourses(): Observable<CourseItem[]> {
    return this.coursesSubject;
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
    this.courses = [...this.courses.slice(0, index),
      ...this.courses.slice(index + 1, this.courses.length)];
    this.coursesSubject.next(this.courses);
  }

  private initializeCourses(): void {
    this.courses = courses.map(course =>
      new CourseItem({
        ...course,
        addedDate: new Date(course.addedDate)
      }));
  }
}
