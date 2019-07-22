import { MaterialModule } from 'src/app/Core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentNoticePage } from './student-notice.page';
import { NoticeDetails } from 'src/app/core/components/pop-up/notice-details/notice-details';

const routes: Routes = [
  {
    path: '',
    component: StudentNoticePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentNoticePage, NoticeDetails],
  entryComponents: [NoticeDetails]
})
export class StudentNoticePageModule {}
