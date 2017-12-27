import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import * as components from './components';
import * as directives from './directives';
import * as services from './services';
import { NoCoursesComponent } from './components/courses-page/course-list/no-courses/no-courses.component';

export function toArray(obj) {
  return Object.values(obj);
}

@NgModule({
  providers: [ ...toArray(services) ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    ...toArray(components),
    ...toArray(directives),
    NoCoursesComponent,
  ],
  exports: [
    components.CoursesPageComponent
  ]
})
export class CoursesModule { }
