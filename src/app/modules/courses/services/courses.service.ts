import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { CoursesResponseParams } from '../models';
import { CoursesConfigService } from './courses-config.service';

@Injectable()
export class CoursesService {
  COURSES_URL = 'http://localhost:3000/courses';

  private courses$ = new BehaviorSubject<CoursesResponseParams>({
    totalItems: 0,
    content: []
  });

  constructor(private http: HttpClient,
              private coursesConfigService: CoursesConfigService) {
    this.coursesConfigService.getConfig$()
      .subscribe(
        () => this.reloadCourses()
      );
  }

  getCourses$(): Observable<CoursesResponseParams> {
    return this.courses$.asObservable();
  }

  reloadCourses(): void {
    this.fetchCourses().subscribe(value => {
      this.courses$.next(value);
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

  private fetchCourses(): Observable<CoursesResponseParams> {
    const options = {
      params: this.coursesConfigService.getHttpConfig()
    };

    return this.http.get(this.COURSES_URL, options)
      .map((data: any) => ({
        totalItems: data.totalItems,
        content: data.content.map(item => ({
          ...item,
          addedDate: new Date(item.addedDate)
        }))
      }));
  }
}
