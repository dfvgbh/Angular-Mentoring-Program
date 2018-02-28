import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from '../../reducers/authentication.reducer';
import { AppState } from '../../reducers/state.model';

@Injectable()
export class AuthenticationService {
  USERS_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<AppState> ) {
    this.store.select('authentication')
      .subscribe(state => {
        localStorage.setItem('username', state.username);
        localStorage.setItem('token', state.token);
      });
  }

  login(login: string, password: string): void {
    this.log('Logging in...');
    if (!login || !password) {
      return;
    }

    const body = {
      login,
      password
    };
    this.http.post(`${this.USERS_URL}/login`, body)
      .subscribe(
        (data: any) => {
          this.store.dispatch({
            type: LOGIN,
            payload: { ...data }
          });
          this.router.navigate(['/courses']);
        },
        (err) => console.log(err)
      );
  }

  logout(): void {
    this.log('Logging out...');

    this.http.post(`${this.USERS_URL}/logout`, null, { responseType: 'text'})
      .subscribe(
        (data: any) => {
          this.store.dispatch({ type: LOGOUT });
          this.router.navigate(['/auth']);
        },
        (err) => console.log(err)
      );
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('username') &&
      localStorage.getItem('token'));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  private log(msg: string): void {
    console.log(`AUTH SERVICE: ${msg}`);
  }
}
