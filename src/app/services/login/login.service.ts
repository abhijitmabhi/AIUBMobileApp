import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/core/result/result';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpClient: HttpClient) { }

  login(user) {

    let formattedPassword = encodeURIComponent(user.password);

    const dt = new HttpParams()
      .set('grant_type','password')
      .set('username', user.username)
      .set('password', formattedPassword);

    // return this.httpClient.post('http://172.16.22.101:41379/Token', dt ).pipe(map(res =>{
    //   return res;
    //  }));

     return this.httpClient.post('http://172.16.22.101:2694/Token', dt ).pipe(map(res =>{
      return res;
     }));

    //  return this.httpClient.post(`https://testapi.aiub.edu/ums-auth-api/Token`, dt).pipe(map(res =>{
    //   return res;
    //  }));
  }

  currentUserInfo(): Observable<IResult>{
    return this.httpClient.get<IResult>(`Common/GetCurrentUserInfo2`);
  }

  checkStudentValidity(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Student/IsStudentValid`);
  }

  logMeOut() : Observable<IResult> {
    return this.httpClient.get<IResult>(`Common/Logout`);
  }
  
}
