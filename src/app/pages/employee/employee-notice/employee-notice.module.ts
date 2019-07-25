import { ComponentsModule } from './../../../core/components/components.module';
import { NoticeDetails } from 'src/app/core/components/pop-up/notice-details/notice-details';
import { MaterialModule } from './../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeNoticePage } from './employee-notice.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeNoticePage],
  entryComponents: [NoticeDetails],
})
export class EmployeeNoticePageModule {}
