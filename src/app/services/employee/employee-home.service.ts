import { IResult } from './../../Core/result/result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHomeService {

  constructor(public httpClient: HttpClient) { }

  public schedule(fromDateTime: string, tillDateTime: string): Observable<IResult> {
    return this.httpClient.get<IResult>(`Employee/Schedule?fromDateTime=${fromDateTime}&tillDateTime=${tillDateTime}`);
  }

}
