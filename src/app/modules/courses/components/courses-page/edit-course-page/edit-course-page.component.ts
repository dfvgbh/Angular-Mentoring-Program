import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { CourseItem } from '../../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'amp-edit-course-page',
  template: `
    <amp-course-form [formValue]="currentCourse"></amp-course-form>`
})
export class EditCoursePageComponent implements OnInit, OnDestroy {
  COURSES_URL = 'http://localhost:3000/courses';

  private sub: Subscription;
  private id: number;
  private currentCourse = {
    name: '',
    description: '',
    addedDate: new Date(),
    duration: 0,
    authors: []
  };

  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchCourse(this.id)
        .subscribe(data => this.currentCourse = data);
    });
  }

  fetchCourse(id: number): Observable<CourseItem>  {
    return this.http.get(`${this.COURSES_URL}/${id}`)
      .map((item: any) => ({
          ...item,
          addedDate: new Date(item.addedDate)
      }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
