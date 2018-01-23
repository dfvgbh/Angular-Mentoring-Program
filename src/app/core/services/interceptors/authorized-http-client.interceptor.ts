import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthorizedHttpClientInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);

    request = request.clone({
      setHeaders: {
        Authorization: `${authService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
