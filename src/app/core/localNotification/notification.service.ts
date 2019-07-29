import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { DataService } from '../dataService/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private localNotifications: LocalNotifications,
    private dataService: DataService) { }

  showNotification(){
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: this.dataService.getPlatform() == 'android' ? 'file://sound.mp3': 'file://beep.caf',
      data: { secret: 'My Data' },
      icon: 'http://example.com/icon.png'
    });
  }
}
