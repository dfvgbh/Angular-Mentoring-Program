import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesComponent } from './courses.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CourseComponent, CourseListComponent, CoursesComponent]
})
export class CoursesModule { }
