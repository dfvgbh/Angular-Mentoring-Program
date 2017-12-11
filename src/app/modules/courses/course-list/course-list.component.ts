import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CourseItem } from '../models';
import { CoursesService } from '../services';

@Component({
  selector: 'amp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnDestroy, OnInit {
  courses: CourseItem[];

  private ngUnsubscribe = new Subject();

  constructor(private coursesService: CoursesService) {
    this.courses = [];
  }

  ngOnInit() {
    this.coursesService.getCourses()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(courses => this.courses = courses);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRemoveItem(courseItem: CourseItem) {
    this.coursesService.removeCourse(courseItem.id);
    console.log(`DELETING: course with ID: ${courseItem.id}`);
  }
}
