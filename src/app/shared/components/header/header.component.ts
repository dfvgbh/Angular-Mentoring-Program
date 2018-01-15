import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../core/services';

@Component({
  selector: 'amp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private userInfo: string;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getUserInfo$()
      .subscribe(
        userInfo => this.userInfo = userInfo
      );
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

}
