import { ComponentsModule } from '../../../../core/components/components.module';
import { NoticeDetails } from '../../../../core/components/pop-up/notice-details/notice-details';
import { MaterialModule } from '../../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeNoticePage } from './employee-notice.page';
import { ModalsModule } from '../../../../modals/modals.module';
import { NoticeUpload } from '../../../../modals/notice-upload/notice-upload';

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
  entryComponents: [NoticeDetails,NoticeUpload],
})
export class EmployeeNoticePageModule {}
