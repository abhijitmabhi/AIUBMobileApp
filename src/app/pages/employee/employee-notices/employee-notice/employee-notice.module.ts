import { ComponentsModule } from '../../../../core/components/components.module';
import { MaterialModule } from '../../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EmployeeNoticePage } from './employee-notice.page';
import { ModalsModule } from 'src/app/modals/modals.module';
import { NotificationDetails } from 'src/app/modals/notification-details/notification-details';
import { NoticeDetails } from 'src/app/modals/notice-details/notice-details';
import { NoticeUpload } from 'src/app/modals/notice-upload/notice-upload';

const routes: Routes = [
  {
    path: '',
    component: EmployeeNoticePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ComponentsModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeNoticePage],
  entryComponents: [NoticeDetails, NotificationDetails, NoticeUpload],
})
export class EmployeeNoticePageModule {}
