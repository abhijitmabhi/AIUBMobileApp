import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public httpClient: HttpClient) { }

  getNotificationsByUser(page: number, pageSize: number) : Observable<any> {
    return this.httpClient.get<any>(`Notification/GetNotificationsByUserID?page=${page}&pageSize=${pageSize}`);
  }

  
}
