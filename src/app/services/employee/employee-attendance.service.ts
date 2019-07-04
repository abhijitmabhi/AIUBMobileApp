import { IResult } from './../../Core/result/result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService {

  constructor(public httpClient: HttpClient) { }

  public getPayroll(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Employee/GetAllPayrolls`);
  }

  public getAttendance(payrollID): Observable<IResult> {
    return this.httpClient.get<IResult>(`Employee/GetAttendance?monthNo=${payrollID}`);
  }
}
