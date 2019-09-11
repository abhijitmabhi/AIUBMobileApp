import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResult } from 'src/app/Core/result/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentProfileService {

  constructor(public httpClient: HttpClient) { }
  
  public getStudentProfile(): Observable<IResult> {
    return this.httpClient.get<IResult>(`Student/GetStudentProfile`);
  }

}

