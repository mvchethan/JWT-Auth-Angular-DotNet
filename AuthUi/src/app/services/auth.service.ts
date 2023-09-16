import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseURL = 'https://localhost:7045/api/User/';
  constructor(private http: HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseURL}registeruser`, userObj)
  }

  logIn(logInObj:any){
    return this.http.post<any>(`${this.baseURL}authenticate`,logInObj)
  }
}
