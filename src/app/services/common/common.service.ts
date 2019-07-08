import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResult } from 'src/app/core/result/result';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public httpClient: HttpClient) { }

  public savePLayerIDIntoDatabase(PlayerID){
    const dt = new HttpParams().set('playerId', PlayerID);
    return this.httpClient.post(`Notification/MapPlayerId`, dt);
  }

  currentUserInfo(): Observable<IResult>{
    return this.httpClient.get<IResult>(`Common/GetCurrentUserInfo2`);
  }

  public getUserWarnings(): Observable<any> {
    return this.httpClient.get<any>('Common/GetUserWarnings');
  }


  public semesterList(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Student/GetSemesterList`);
  }

  public currentSemester(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Common/GetCurrentSemester`);
  }

  public registeredCoursesBySemester(semesterId: number): Observable<IResult> {
    return this.httpClient.get<IResult>(`Student/GetCourseList?semesterID=${semesterId}`);
  }
 
}
