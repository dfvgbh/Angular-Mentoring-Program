import { Injectable } from '@angular/core';

import { CourseItem } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import { from } from 'rxjs/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { courses } from './courses.mock';

@Injectable()
export class CoursesService {
  private courses = courses;
  private coursesSubject = new BehaviorSubject<CourseItem[]>([]);

  constructor() {  }

  getCourses(): Observable<CourseItem[]> {
    return this.coursesSubject.asObservable();
  }

  updateCourses(): void {
    this.fetchCourses().subscribe(value => {
      this.coursesSubject.next(value);
    });
  }

  // createCourse(course: CourseItem): void {
  //   this.courses.push(course);
  // }
  //
  // getCourseById(id: number): CourseItem | undefined {
  //   return this.courses.find(course => course.id === id);
  // }
  //
  // updateCourse(course: CourseItem): void {
  //   const origCourse = this.getCourseById(course.id);
  //   Object.assign(origCourse, course);
  // }
  //
  removeCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
    this.updateCourses();
  }

  private fetchCourses(): Observable<CourseItem[]> {
    return from(this.courses)
      .map((o: any) => new CourseItem({
        ...o,
        addedDate: o.addedDate
      }))
      .toArray();
  }
}
