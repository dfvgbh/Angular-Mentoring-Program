import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { CourseItem } from '../../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'amp-edit-course-page',
  template: `<amp-course-form [formValue]="currentCourse"
                              (save)="doEditCourse($event)"
                              (cancel)="navigateBack()"></amp-course-form>`
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
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchCourse(this.id)
        .subscribe(data => this.currentCourse = data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchCourse(id: number): Observable<CourseItem>  {
    return this.http.get(`${this.COURSES_URL}/${id}`)
      .map((item: any) => ({
          ...item,
          addedDate: new Date(item.addedDate)
      }));
  }

  doEditCourse(body: CourseItem) {
    this.http.put(`${this.COURSES_URL}/${this.id}`, body)
      .subscribe(
        () => {},
        err => console.error(err),
        () => this.navigateBack()
      );
  }

  navigateBack() {
    this.router.navigate(['/courses']);
  }
}
