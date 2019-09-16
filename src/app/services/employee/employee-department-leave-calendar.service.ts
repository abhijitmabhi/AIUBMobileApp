import { Injectable } from '@angular/core';
import { IResult } from './../../Core/result/result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDepartmentLeaveCalendarService {

  constructor(public httpClient: HttpClient) { }

  public GetDepartmentLeaveMonths(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Hr/GetDepartmentLeaveMonths`);
  }

  public GetDepartmentLeaves(payrollID): Observable<IResult>{
    return this.httpClient.get<IResult>(`Hr/GetDepartmentLeave?payrollNo=${payrollID}`);
  }
}
