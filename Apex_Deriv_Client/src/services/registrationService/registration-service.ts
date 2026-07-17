import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister, UserResponse } from '../../Interfaces/generic-interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) { }

  private registerUrl = `${environment.baseUrl}`;

  registerUser(userData: UserRegister): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.registerUrl}/api/v1/User/create-new-user`, userData);
  }

  verifyUser(loginData: UserLogin): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.registerUrl}/api/v1/User/verify-user`, loginData);
  }
}
