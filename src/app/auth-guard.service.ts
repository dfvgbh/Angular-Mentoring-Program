import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    console.log('Access restricted!');
    this.router.navigate(['/auth']);
    return false;
  }
}
