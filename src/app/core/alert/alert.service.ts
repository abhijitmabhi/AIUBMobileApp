import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController, private router: Router) { }

  async Success(obj){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: obj ? obj  :'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertError(msg){
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
            // localStorage.setItem('route', route);
            // this.router.navigate(['/error-landing']);
          }
        }
      ]
    });
    await alert.present();
  }

  async alertForSubscribeToOneSignal(msg){
    const alert = await this.alertController.create({
      header: 'Push Notification Alert!',
      subHeader: '',
      message: msg ? msg  :'Something Went Wrong',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // localStorage.setItem('route', route);
            // this.router.navigate(['/error-landing']);
          }
        },
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // localStorage.setItem('route', route);
            // this.router.navigate(['/error-landing']);
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
