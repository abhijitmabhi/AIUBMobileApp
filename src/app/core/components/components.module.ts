import { NoticeDetails } from './pop-up/notice-details/notice-details';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationDetails } from './pop-up/notification-details/notification-details';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [NotificationDetails, NoticeDetails],
  exports: [NotificationDetails, NoticeDetails]
})
export class ComponentsModule { }
