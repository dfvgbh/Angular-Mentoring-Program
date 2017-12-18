import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import * as services from './services';
import * as components from './components';

function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

@NgModule({
  providers: [ ...toArray(services) ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ ...toArray(components) ],
  exports: [
    components.CoursesPageComponent
  ]
})
export class CoursesModule { }
