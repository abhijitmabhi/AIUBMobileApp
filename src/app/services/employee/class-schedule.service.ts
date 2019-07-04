import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassScheduleService {

  constructor(public httpClient: HttpClient) { }

  public getTeacherClassSchedule(fromDateTime: string, toDateTime: string): Observable<any> {
    return this.httpClient.get<any>(`ClassSchedule/GetClassSchedule?fromDateTime=${fromDateTime}&tillDateTime=${toDateTime}`);
  }
}
