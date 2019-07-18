import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/core/result/result';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public httpClient: HttpClient) { }

  public getNoteByNoteId(noteId: number): Observable<IResult> {
    return this.httpClient.get<IResult>(`Section/DownloadDocument?Id=${noteId}`);
  }

  public getNotesBySection(sectionId:number, page:number, pageSize:number): Observable<IResult> {
    return this.httpClient.get<IResult>(`Section/GetNotes?sectionID=${sectionId}&page=${page}&pageSize=${pageSize}`);
  }
  
}
