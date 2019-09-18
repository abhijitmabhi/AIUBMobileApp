import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';
import { DataService } from '../dataService/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  signal_app_id: string = "b945d1b3-030a-46ca-895b-ec97919f689a";
  firebase_id: string = "860919846901";
  constructor(
    private oneSignal: OneSignal,
    private commonService: CommonService,
    private alertController: AlertController,
    private router: Router,
    private dataService: DataService
  ) { }

  oneSignalSubscription() {
    this.oneSignal.startInit(this.signal_app_id, this.firebase_id);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe((res) => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      // do something when notification is opened
      localStorage.setItem('notification', JSON.stringify(res.notification.payload.additionalData.ID));
      let urls = res.notification.payload.additionalData.URL.split('/');
      if(urls.length == 1){
        this.router.navigateByUrl(`${urls[0]}`);
      }
      else {
        this.router.navigate([`${urls[0]}`, `${urls[1]}`]);
      }
      
    });

    this.oneSignal.endInit();
    // this.oneSignal.setSubscription(true);
  }

  getPlayerID() {
    this.oneSignal.getIds().then(obj => {
      if (!localStorage.getItem('playerId')) {
        localStorage.setItem('playerId', obj.userId);
      }
      this.commonService.savePLayerIDIntoDatabase(obj.userId, false).subscribe(res => {
        if (res.Data.HasWarning) {
          this.alertForSubscribeToOneSignal(obj.userId);
        }
      });
    });
  }

  getPlayerID2(playerID) {
    return this.commonService.savePLayerIDIntoDatabase(playerID, true).subscribe(res => {
      console.log(res);
    });
  }

  unsubscribeFromNotification() {
    this.oneSignal.setSubscription(false);
  }

  async alertForSubscribeToOneSignal(playerID) {
    const alert = await this.alertController.create({
      header: 'Push Notification Alert!',
      subHeader: '',
      message: 'Do you want to opt out push notifications from another device?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          cssClass: 'secondary',
          handler: () => {
            this.getPlayerID2(playerID)
          }
        }
      ]
    });
    await alert.present();
  }

 
}
