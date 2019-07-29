import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/Core/result/result';

@Injectable({
  providedIn: 'root'
})
export class CoursesResultsService {

  constructor(public httpClient: HttpClient) { }

  public getCoursesAndResults(semesterID, sectionID) : Observable<IResult>{
    return this.httpClient.get<IResult>(`Student/GetCourseResultDetail?semesterId=${semesterID}&sectionId=${sectionID}`);
  }
}

