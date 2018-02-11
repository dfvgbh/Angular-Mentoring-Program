import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as components from './components';
import * as pipes from './pipes';
import { DateInputComponent } from './components/date-input/date-input.component';

export function toArray(obj) {
  return Object.values(obj);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...toArray(components),
    ...toArray(pipes),
    DateInputComponent
  ],
  exports: [
    components.HeaderComponent,
    components.FooterComponent,
    components.LogoComponent,
    components.PaginationComponent,
    pipes.DurationPipe,
    pipes.OrderByPipe
  ]
})
export class SharedModule { }
