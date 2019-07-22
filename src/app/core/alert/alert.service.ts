import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PushNotificationService } from '../oneSignal/push-notification.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private alertController: AlertController, 
    private router: Router,
    private pushNotificationService: PushNotificationService
    ) { }

  async Success(obj){
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: obj ? obj  :'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertError(msg){
    const alert = await this.alertController.create({
      header: 'Warning!',
      subHeader: '',
      message: msg ? msg  :'Something Went Wrong',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  async alertForSubscribeToOneSignal(playerID){
    const alert = await this.alertController.create({
      header: 'Push Notification Alert!',
      subHeader: '',
      message: 'You have registered for push notifications from another device. Do you want to ovverride it?',
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
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.pushNotificationService.getPlayerID2(playerID)
          }
        }
      ]
    });
    await alert.present();
  }

  async alertErrorWithLandingPage(msg, route){
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: '',
      message: msg ? msg  :'Something Went Wrong',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            localStorage.setItem('route', route);
            this.router.navigate(['/error-landing']);
          } 
        }
      ]
    });
    await alert.present();
  }
}
