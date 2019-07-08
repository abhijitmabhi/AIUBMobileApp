import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentClassScheduleService {

  constructor(public httpClient: HttpClient) { }

  public getStudentClassSchedule(fromDateTime: string, toDateTime: string): Observable<any> {
    return this.httpClient.get<any>(`ClassSchedule/GetClassSchedule?fromDateTime=${fromDateTime}&tillDateTime=${toDateTime}`);
  }
}
