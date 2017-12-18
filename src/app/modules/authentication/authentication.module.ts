import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import * as components from './components';

function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ ...toArray(components) ],
  exports: [
    components.LoginPageComponent
  ]
})
export class AuthenticationModule { }
