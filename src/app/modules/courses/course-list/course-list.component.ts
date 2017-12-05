import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models';
import { courses } from './courses.mock';

@Component({
  selector: 'amp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: CourseItem[];

  constructor() {
    this.courses = [];
  }

  onRemoveItem(courseItem: CourseItem) {
    console.log(`DELETING: course with ID: ${courseItem.id}`);
  }

  ngOnInit() {
    this.courses = courses.map(({ id, title, addedDate, duration, description }) =>
      new CourseItem(id, title, addedDate, duration, description));
  }
}
