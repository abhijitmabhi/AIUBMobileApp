import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationDetails } from './pop-up/notification-details/notification-details';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [NotificationDetails],
  exports: [NotificationDetails]
})
export class ComponentsModule { }
