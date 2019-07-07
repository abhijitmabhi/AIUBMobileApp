import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResult } from 'src/app/Core/result/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentProfileService {

  constructor(public httpClient: HttpClient) { }
  
  public getEmployeeProfile(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Student/GetStudentProfile`);
  }

  public getImage(): Observable<any> {
    return this.httpClient.get<any>(`Common/GetProfileImage`);
  }
}

