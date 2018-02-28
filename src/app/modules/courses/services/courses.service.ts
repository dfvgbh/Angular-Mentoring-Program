import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CoursesResponseParams } from '../models';
import { CoursesConfigService } from './courses-config.service';
import { AppState } from '../../../reducers/state.model';
import { Store } from '@ngrx/store';
import { SET_COURSES } from '../../../reducers/courses.reducer';

@Injectable()
export class CoursesService {
  COURSES_URL = 'http://localhost:3000/courses';

  constructor(private http: HttpClient,
              private coursesConfigService: CoursesConfigService,
              private store: Store<AppState>) {
  }

  reloadCourses(): void {
    this.fetchCourses().subscribe(value => {
      this.store.dispatch({
        type: SET_COURSES,
        payload: { ...value }
      });
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
