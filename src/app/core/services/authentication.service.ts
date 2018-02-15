import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private userInfoSubject: BehaviorSubject<string>;
  USERS_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient,
              private router: Router) {
    this.userInfoSubject = new BehaviorSubject(this.getUserInfo());
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
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
          this.broadcastUserInfo();
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
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          this.broadcastUserInfo();
          this.router.navigate(['/auth']);
        },
        (err) => console.log(err)
      );
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('username') &&
      localStorage.getItem('token'));
  }

  getUserInfo$(): Observable<string> {
    return this.userInfoSubject.asObservable();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  private broadcastUserInfo() {
    this.userInfoSubject.next(this.getUserInfo());
  }

  private getUserInfo(): string {
    return localStorage.getItem('username');
  }

  private log(msg: string): void {
    console.log(`AUTH SERVICE: ${msg}`);
  }
}
