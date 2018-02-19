import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CourseItem } from '../../../models';

@Component({
  selector: 'amp-add-course-page',
  template: `<amp-course-form (save)="addCourse($event)"
                              (cancel)="navigateBack()"></amp-course-form>`
})
export class AddCoursePageComponent {
  COURSES_URL = 'http://localhost:3000/courses';

  constructor(private router: Router,
              private http: HttpClient) { }

  addCourse(body: CourseItem) {
    this.http.post(`${this.COURSES_URL}`, body)
      .subscribe(
        data => console.log(data),
        err => console.error(err),
        () => this.navigateBack()
      );
  }

  navigateBack() {
    this.router.navigate(['/courses']);
  }
}
