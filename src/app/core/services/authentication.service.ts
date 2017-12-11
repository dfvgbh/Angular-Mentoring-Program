import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string): void {
    this.log('Logging in...');
    if (!username || !password) {
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('token', this.getToken(username));
  }

  logout(): void {
    this.log('Logging out...');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('username') &&
      localStorage.getItem('token'));
  }

  getUserInfo(): string {
    return localStorage.getItem('username');
  }

  private getToken(username: string = ''): string {
    return `${username}${+new Date()}`;
  }

  private log(msg: string): void {
    console.log(`AUTH SERVICE: ${msg}`);
  }
}
