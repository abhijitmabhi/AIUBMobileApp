import { NoticeDetails } from './notice-details/notice-details';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationDetails } from './notification-details/notification-details';
import { NoticeUpload } from './notice-upload/notice-upload';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [NotificationDetails, NoticeDetails, NoticeUpload],
  exports: [NotificationDetails, NoticeDetails, NoticeUpload]
})
export class ModalsModule { }
