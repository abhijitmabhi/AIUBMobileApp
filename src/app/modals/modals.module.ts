import { NoticeDetails } from './notice-details/notice-details';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationDetails } from './notification-details/notification-details';
import { StudentDetailsComponent } from 'src/app/modals/student-details/student-details.component';
import { NoticeUpload } from './notice-upload/notice-upload';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [NotificationDetails, NoticeDetails, NoticeUpload, StudentDetailsComponent],
  exports: [NotificationDetails, NoticeDetails, NoticeUpload, StudentDetailsComponent]
})
export class ModalsModule { }
