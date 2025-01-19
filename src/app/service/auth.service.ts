import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Login, Register } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private baseUri = "auth";

  userName = new BehaviorSubject<string>("");
  private token = new BehaviorSubject<string>("");
  currentData = this.token.asObservable();

  isAuthenticated = new BehaviorSubject<boolean>(localStorage.getItem('token') != null ? true : false);

  private expireTime = new BehaviorSubject<Date | null>(new Date());
  currentExpireTime = this.expireTime.asObservable();

  
  constructor(private httpClient: HttpClient) {
    this.token.next(localStorage.getItem('token') ?? "");
    this.userName.next(localStorage.getItem("userName")?? "");
    this.isAuthenticated.next(localStorage.getItem('token') != "" && localStorage.getItem('token') != null ? true : false);
   }
  

  register(model : Register){
    return this.httpClient.post<any>(`${this.baseUrl}${this.baseUri}/register`,model);
  }

  login(model : Login){
    return this.httpClient.post<any>(`${this.baseUrl}${this.baseUri}/login`,model);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    this.updateToken("","");
    this.updateExpireTime(null);
    this.isAuthenticated.next(false);
  }

  get name(){
    return this.userName.getValue();
  }

  updateToken(token: string, userName: string){
    localStorage.setItem("token",token);
    this.token.next(token);
    this.userName.next(userName);
    localStorage.setItem("name",userName);
    if(token != "" && token != null){
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }
  updateExpireTime(time:Date | null){
    console.log(time)
    localStorage.setItem("expireTime",time?.toString() ?? "");
    this.expireTime.next(time);
  }
  
}
