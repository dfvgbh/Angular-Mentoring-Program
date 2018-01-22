import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CourseItem } from '../../../models';
import { CoursesService } from '../../../services';
import { DialogService } from '../../../../../core/services';
import { DialogConfig } from '../../../../../core/models';

@Component({
  selector: 'amp-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CourseListComponent implements OnDestroy, OnInit {
  courses: CourseItem[];
  totalItems = 33;

  private readonly REMOVE_COURSE_DIALOG_CONFIG: DialogConfig = {
    title: 'Do you really want to delete this course?',
    actions: {
      accept: 'Ok',
      decline: 'Cancel'
    }
  };
  private unsubscribe$ = new Subject();

  constructor(private coursesService: CoursesService,
              private dialogService: DialogService) {
    this.courses = [];
  }

  ngOnInit() {
    this.coursesService.reloadCourses();
    this.coursesService.getCourses$()
      .takeUntil(this.unsubscribe$)
      .subscribe(courses => this.courses = courses);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onRemoveItem(courseItem: CourseItem) {
    this.dialogService.show(this.REMOVE_COURSE_DIALOG_CONFIG)
      .then(() => {
        this.coursesService.removeCourse(courseItem.id);
        console.log(`DELETING: course with ID: ${courseItem.id}`);
      })
      .catch(() => {});
  }

  onSearchItem(searchQuery: string) {
    this.coursesService.setCoursesHttpParams({
      name: searchQuery,
      page: 1
    });
    this.coursesService.reloadCourses();
  }

  onPageChange(page: number) {
    this.coursesService.setCoursesHttpParams({
      page
    });
    this.coursesService.reloadCourses();
  }
}
