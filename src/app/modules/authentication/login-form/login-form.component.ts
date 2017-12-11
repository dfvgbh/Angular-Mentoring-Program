import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../core/services';

@Component({
  selector: 'amp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  username = '';
  password = '';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.username, this.password);
  }
}
