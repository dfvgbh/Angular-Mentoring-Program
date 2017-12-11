import { Component } from '@angular/core';

import { AuthenticationService } from '../../core/services';

@Component({
  selector: 'amp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  getUserInfo(): string {
    return this.authenticationService.getUserInfo();
  }

}
