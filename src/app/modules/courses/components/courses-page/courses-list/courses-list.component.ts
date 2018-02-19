import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { DEFAULT_PAGE_SIZE, PAGES_START_FROM} from '../../../courses.constants';
import { CourseItem, CoursesResponseParams } from '../../../models';
import { CoursesService, CoursesConfigService } from '../../../services';
import { DialogService } from '../../../../../core/services';
import { DialogConfig } from '../../../../../core/models';
import { CoursesRequestParams } from '../../../models/courses-request-params.model';

@Component({
  selector: 'amp-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CourseListComponent implements OnDestroy, OnInit {
  courses: CourseItem[] = [];
  totalItems = 0;
  currentPage = PAGES_START_FROM;
  pageSize = DEFAULT_PAGE_SIZE;
  startFrom = PAGES_START_FROM;

  private readonly REMOVE_COURSE_DIALOG_CONFIG: DialogConfig = {
    title: 'Do you really want to delete this course?',
    actions: {
      accept: 'Ok',
      decline: 'Cancel'
    }
  };
  private unsubscribe$ = new Subject();

  constructor(private coursesService: CoursesService,
              private coursesConfigService: CoursesConfigService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.coursesService.getCourses$()
      .takeUntil(this.unsubscribe$)
      .subscribe((data: CoursesResponseParams) => {
        this.totalItems = data.totalItems;
        this.courses = data.content;
      });

    this.coursesConfigService.getConfig$()
      .takeUntil(this.unsubscribe$)
      .subscribe((config: CoursesRequestParams) => {
        this.coursesService.reloadCourses();
        this.currentPage = config.page;
        this.pageSize = config.pageSize;
      });

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
    this.coursesConfigService.setConfig({
      name: searchQuery,
      page: 1
    });
  }

  onPageChange(page: number) {
    this.coursesConfigService.setConfig({
      page
    });
  }
}
