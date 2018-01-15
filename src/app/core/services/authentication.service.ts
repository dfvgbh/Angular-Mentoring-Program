import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private userInfoSubject: BehaviorSubject<string>;

  constructor() {
    this.userInfoSubject = new BehaviorSubject(this.getUserInfo());
  }

  login(username: string, password: string): void {
    this.log('Logging in...');
    if (!username || !password) {
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('token', this.getToken(username));

    this.broadcastUserInfo();
  }

  logout(): void {
    this.log('Logging out...');
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    this.broadcastUserInfo();
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('username') &&
      localStorage.getItem('token'));
  }

  getUserInfo$(): Observable<string> {
    return this.userInfoSubject.asObservable();
  }

  private broadcastUserInfo() {
    this.userInfoSubject.next(this.getUserInfo());
  }

  private getUserInfo(): string {
    return localStorage.getItem('username');
  }

  private getToken(username: string = ''): string {
    return `${username}${+new Date()}`;
  }

  private log(msg: string): void {
    console.log(`AUTH SERVICE: ${msg}`);
  }
}
