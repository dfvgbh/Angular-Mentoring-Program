import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as components from './components';
import * as pipes from './pipes';

function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

@NgModule({
  imports: [
    CommonModule
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
