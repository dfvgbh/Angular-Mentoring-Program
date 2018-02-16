import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as components from './components';
import * as pipes from './pipes';

export function toArray(obj) {
  return Object.values(obj);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ...toArray(components),
    ...toArray(pipes)
  ],
  exports: [
    ...toArray(components),
    ...toArray(pipes)
  ]
})
export class SharedModule { }
