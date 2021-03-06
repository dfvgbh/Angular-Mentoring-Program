import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../core/services';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from '../../../reducers/state.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'amp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private userInfo: string;
  breadcrumbs = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('authentication')
      .subscribe(
        state => this.userInfo = state.username
      );

    this.buildBreadscrumbs();

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.buildBreadscrumbs();
      }
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  private buildBreadscrumbs() {
    this.breadcrumbs.length = 0;
    const parts = this.router.url.split('/');
    parts.shift();
    parts.forEach(part => {
      this.breadcrumbs.push({
        name: part,
        link: null
      });
    });
    this.breadcrumbs[0].link = `/${parts[0]}`;
  }

}
