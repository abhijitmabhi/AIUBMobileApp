import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CommonService } from 'src/app/services/common/common.service';
// import { HomeApiService } from 'src/app/Services/student/home-api.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  signal_app_id: string = "b945d1b3-030a-46ca-895b-ec97919f689a";
  firebase_id:string = "860919846901";
  constructor(
      private oneSignal: OneSignal,
      private commonService : CommonService
  ) { }

  oneSignalSubscription(){
      this.oneSignal.startInit(this.signal_app_id, this.firebase_id);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe((res) => {
      // do something when notification is received
          console.log(res);
      });
  
      this.oneSignal.handleNotificationOpened().subscribe((res) => {
        // do something when a notification is opened
          console.log(res); 
      });
      
      this.oneSignal.endInit();  
      // this.oneSignal.setSubscription(true);
  }

  getPlayerID(){
    //   this.oneSignal.getIds().then(obj => {
    //       this.commonService.savePLayerIDIntoDatabase(obj.userId).subscribe(res => {
    //           console.log(res);
    //       });
    //   });

      this.commonService.savePLayerIDIntoDatabase('4c025713-ba9a-46f6-b747-e4967acfee7e').subscribe(res => {
        console.log(res);
    });
  }

  unsubscribeFromNotification(){
      this.oneSignal.setSubscription(false);
  }
}
