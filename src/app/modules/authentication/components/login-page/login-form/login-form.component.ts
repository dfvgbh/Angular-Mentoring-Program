import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../../core/services';

@Component({
  selector: 'amp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  login = '';
  password = '';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onLogin(e: Event) {
    e.preventDefault();
    this.authenticationService.login(this.login, this.password);
  }
}
