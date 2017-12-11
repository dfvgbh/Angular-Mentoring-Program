import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseItemComponent } from './course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolboxComponent } from './toolbox/toolbox.component';

import * as services from './services';

function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

@NgModule({
  providers: [
    ...toArray(services)
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    CourseItemComponent,
    CourseListComponent,
    CoursesComponent,
    ToolboxComponent
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
