import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResult } from 'src/app/Core/result/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SectionService {

  constructor(public httpClient: HttpClient) { }
  
  public getStudentBySection(sectionId:number): Observable<IResult> {
    return this.httpClient.get<IResult>(`Section/GetStudentList?sectionID=${sectionId}`);
  }
}

