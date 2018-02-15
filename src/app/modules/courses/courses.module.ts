import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import * as components from './components';
import * as directives from './directives';
import * as services from './services';

export function toArray(obj) {
  return Object.values(obj);
}

@NgModule({
  providers: [...toArray(services)],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    ...toArray(components),
    ...toArray(directives)
  ],
  exports: [
    components.CoursesPageComponent,
    components.AddCoursePageComponent
  ]
})
export class CoursesModule {
}
