import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serviceData: any;
  test:any;
  isModalOn = false;
  isFirstTime = false;
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

  getPlayerId(){
    return localStorage.getItem('playerId');
  }

  isToken(){
    return localStorage.getItem('token') ? true : false;
  }

  getUserType(){
    if(this.isToken()){
      return localStorage.getItem('userType');
    }
  }

  getToken(){
    if(this.isToken()){
      return localStorage.getItem('token');
    }
  }

  getUserId(){
    if(this.isToken()){
      return localStorage.getItem('UserID');
    }
  }

  validateString(str){
    if(str === null || str === undefined || str === '' ) return true;
  }
}
