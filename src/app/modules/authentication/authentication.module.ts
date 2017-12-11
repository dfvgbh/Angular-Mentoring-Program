import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AuthenticationComponent,
    LoginFormComponent
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
