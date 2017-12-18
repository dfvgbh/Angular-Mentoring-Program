import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CourseItem } from '../../../models';
import { CoursesService } from '../../../services';
import { DialogService } from '../../../../../core/services';
import { DialogConfig } from '../../../../../core/models';


@Component({
  selector: 'amp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnDestroy, OnInit {
  courses: CourseItem[];
  private readonly REMOVE_COURSE_DIALOG_CONFIG: DialogConfig = {
    title: 'Do you really want to delete this course?',
    actions: {
      accept: 'Ok',
      decline: 'Cancel'
    }
  };

  private ngUnsubscribe = new Subject();

  constructor(private coursesService: CoursesService,
              private dialogService: DialogService) {
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
    this.dialogService.show(this.REMOVE_COURSE_DIALOG_CONFIG)
      .then(() => {
        this.coursesService.removeCourse(courseItem.id);
        console.log(`DELETING: course with ID: ${courseItem.id}`);
      })
      .catch(() => {});
  }
}
