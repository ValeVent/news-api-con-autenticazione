import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginInfo, ILoginResponse } from '../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userCredentials: ILoginInfo): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('http://localhost:3000/login', userCredentials);
  }

  setToken(accessToken: string): void {
    localStorage.setItem('token', accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
