import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) { }

  isLoading: boolean = false;

  async loadingStart(){
    this.isLoading = true;
    return await this.loadingCtrl.create({
        spinner: "dots",
        translucent: true
        }).then( a => {
          a.present().then(() => {
            if(!this.isLoading){
              a.dismiss();
            }
          })
        });
  }

  async loadingDismiss(){
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }
}
