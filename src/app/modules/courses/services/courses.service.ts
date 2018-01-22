import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import { CourseItem } from '../models';
import { CoursesHttpParams } from '../models/courses-http-params.model';

@Injectable()
export class CoursesService {
  TWO_WEEKS = 14 * 24 * 3600 * 1000;
  COURSES_URL = 'http://localhost:3000/courses';
  DEFAULT_PAGE_SIZE = '10';

  private coursesSubject = new BehaviorSubject<CourseItem[]>([]);
  private requestCoursesParams = new HttpParams()
    .set('pageSize', this.DEFAULT_PAGE_SIZE)
    .set('page', '1');

  constructor(private http: HttpClient) {  }

  getCourses$(): Observable<CourseItem[]> {
    return this.coursesSubject.asObservable();
  }

  reloadCourses(): void {
    this.fetchCourses().subscribe(value => {
      this.coursesSubject.next(value);
    });
  }

  removeCourse(id: number): void {
    const options: object = {
      params: new HttpParams().set('id', id.toString()),
      responseType: 'text'
    };

    this.http.delete(this.COURSES_URL, options)
      .subscribe(
        () => this.reloadCourses(),
        err => console.log(err)
      );
  }

  setCoursesHttpParams(params: CoursesHttpParams): void {
    Object.keys(params)
      .forEach(key => {
        this.requestCoursesParams = this.requestCoursesParams.set(key, params[key].toString());
      });
  }

  private fetchCourses(): Observable<CourseItem[]> {
    const options = {
      params: this.requestCoursesParams
    };

    return this.http.get(this.COURSES_URL, options)
      .mergeMap((data: any) => from(data.content))
      .map((o: any) => new CourseItem({
        ...o,
        addedDate: new Date(o.addedDate)
      }))
      // .filter((course: CourseItem) => this.filterOutdated(course, this.TWO_WEEKS))
      .toArray();
  }

  private filterOutdated(course: CourseItem, howOld: number): boolean {
    const currentDate = new Date();
    return +course.addedDate > +currentDate - howOld;
  }
}
