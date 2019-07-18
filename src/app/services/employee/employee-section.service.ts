import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/core/result/result';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSectionService {

  constructor(public httpClient: HttpClient) { }

  public getSectionNoticeBySectionId(sectionId: number): Observable<IResult> {
    return this.httpClient.get<IResult>(`SectionNotice/GetSectionNotices?sectionID=${sectionId}`);
  }

  public getStudentBySection(sectionId:number, page:number, pageSize:number): Observable<IResult> {
    return this.httpClient.get<IResult>(`Section/GetStudentList?sectionID=${sectionId}&page=${page}&pageSize=${pageSize}`);
  }
}
