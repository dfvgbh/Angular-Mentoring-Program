import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as components from './components';
import * as pipes from './pipes';

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
    ...toArray(pipes)
  ],
  exports: [
    components.HeaderComponent,
    components.FooterComponent,
    components.LogoComponent,
    pipes.DurationPipe,
    pipes.OrderByPipe
  ]
})
export class SharedModule { }
