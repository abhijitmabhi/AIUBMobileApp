import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResult } from '../../core/result/result';
import { settings } from '../../core/settings/systemSettings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpClient: HttpClient) { }

  login(user) {

    let formattedPassword = encodeURIComponent(user.password);

    const dt = new HttpParams()
      .set('grant_type', 'password')
      .set('username', user.username)
      .set('password', formattedPassword);

     return this.httpClient.post(`${settings.tokenUrl}`, dt).pipe(map(res =>{
      return res;
     }));
  }

  currentUserInfo(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Common/GetCurrentUserInfo2`);
  }

  checkStudentValidity(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Student/IsStudentValid`);
  }

  logMeOut(playerId) {
    const dt = new HttpParams()
      .set('playerId', playerId);
    return this.httpClient.post(`Common/Logout`, dt ).pipe(map(res =>{
      return res;
     }));
  }

}
