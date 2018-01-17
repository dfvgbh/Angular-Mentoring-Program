import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import * as components from './components';
import * as directives from './directives';
import * as services from './services';
import { AddCourseFormComponent } from './components/courses-page/add-course/add-course-form/add-course-form.component';

export function toArray(obj) {
  return Object.values(obj);
}

@NgModule({
  providers: [...toArray(services)],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    ...toArray(components),
    ...toArray(directives),
    AddCourseFormComponent
  ],
  exports: [
    components.CoursesPageComponent,
    components.AddCoursePageComponent
  ]
})
export class CoursesModule {
}
