import { IUser } from './../interfaces/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getToken(): any {
    // const expDate: any = localStorage.getItem('TokenExp');
    // if (Date.now() > expDate) {
    //   this.logout();
    //   return null;
    // }
    return localStorage.getItem('Token');
  }

  login(user: IUser) {
    return this.http.post('/api/auth/login', user).pipe(tap(this.setToken));
  }
  registration(user: IUser) {
    return this.http.post('/api/auth/register', user);
  }
  public logout() {
    this.setToken(null);
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(res: any) {
    console.log('re', res);
    if (res) {
      //   const expData = new Date(new Date().getTime() + +res.expiresIn * 1000);
      //   localStorage.setItem('TokenExp', expData.toString());
      localStorage.setItem('Token', res.token);
    } else {
      localStorage.clear();
    }
  }
}
