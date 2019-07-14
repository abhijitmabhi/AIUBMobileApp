import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public httpClient: HttpClient) { }

  public getNotificationsByUser(page: number, pageSize: number) : Observable<any> {
    return this.httpClient.get<any>(`Notification/GetNotificationsByUserID?page=${page}&pageSize=${pageSize}`);
  }

  public changeStatusById(notification) : Observable <any>  {
    // const dt = new HttpParams().set('id', id);
    let httpParams = new HttpParams({ fromObject: notification });
    return this.httpClient.post<any>(`Notification/ChangeStatusByID`, httpParams );
  }

  public seenAllNotifications() {
    return this.httpClient.get(`Notification/MarkNotificationAsSeen`);
  }

  
}
