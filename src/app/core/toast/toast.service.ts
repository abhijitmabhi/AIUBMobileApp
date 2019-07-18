import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
}
