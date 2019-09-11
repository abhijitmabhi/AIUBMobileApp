import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResult } from 'src/app/core/result/result';
import { DataService } from '../../core/dataService/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public httpClient: HttpClient, private dataService: DataService) { }

  public savePLayerIDIntoDatabase(PlayerID, hasWarning){
    const dt = new HttpParams()
    .set('playerId', PlayerID)
    .set('HasWarning', hasWarning);
    return this.httpClient.post<IResult>(`Notification/MapPlayerId`, dt);
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

  public getImage(): Observable<any> {
    return this.httpClient.get<any>(`Common/GetProfileImage`);
  }

  public saveUserFeedback(objFeedback){
    const dt = new HttpParams()
    .set('TypeID', objFeedback.TypeID)
    .set('UserID', this.dataService.getUserId())
    .set('Description', objFeedback.Description);
    return this.httpClient.post<IResult>(`Common/UserFeedback`, dt);
  }

}
