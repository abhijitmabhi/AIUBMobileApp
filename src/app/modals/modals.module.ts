import { NoteUpload } from '../modals/note-upload/note-upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticeUpload } from '../modals/notice-upload/notice-upload';
import { MaterialModule } from '../core/modules/material.module';
import { FormsModule } from '@angular/forms';
import { NoticeDetails } from './notice-details/notice-details';
import { NotificationDetails } from './notification-details/notification-details';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [NoteUpload, NoticeUpload, NoticeDetails, NotificationDetails],
  exports: [NoteUpload, NoticeUpload, NoticeDetails, NotificationDetails],
  entryComponents:[ ]
})
export class ModalsModule { }
