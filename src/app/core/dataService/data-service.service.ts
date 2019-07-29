import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serviceData: any;
  
  constructor(public platform: Platform){

  }

  getPlatform(){
    let platformType = "";
    if (this.platform.is('ios')) {
      platformType = 'ios';
     }
     if (this.platform.is('android')) {
      platformType = 'android';
     }
     return platformType;
  }
}
