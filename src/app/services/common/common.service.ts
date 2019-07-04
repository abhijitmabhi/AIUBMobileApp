import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public httpClient: HttpClient) { }

  public savePLayerIDIntoDatabase(PlayerID){
    const dt = new HttpParams().set('playerId', PlayerID);
    return this.httpClient.post(`Notification/MapPlayerId`, dt);
  }

  public getUserWarnings(): Observable<any> {
    return this.httpClient.get<any>('Common/GetUserWarnings');
  }
}
