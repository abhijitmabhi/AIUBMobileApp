import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from '../../core/result/result';

@Injectable({
  providedIn: 'root'
})
export class NoticeUploadService {

  constructor(public httpClient: HttpClient) { }

  public saveNotice(notice){
    const dt = new HttpParams()
    .set('SectionID', notice.SectionID)
    .set('Description', notice.Description)
    .set('ValidTill', notice.ValidTill)
    .set('PostDate', notice.PostDate)
    .set('Subject', notice.Subject);
    return this.httpClient.post<IResult>(`Employee/SaveSectionNotice`, dt);
  }
  
}