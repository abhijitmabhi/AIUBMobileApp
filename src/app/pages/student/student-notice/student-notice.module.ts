import { ComponentsModule } from 'src/app/core/components/components.module';
import { MaterialModule } from 'src/app/Core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentNoticePage } from './student-notice.page';
import { ModalsModule } from 'src/app/modals/modals.module';
import { NoticeDetails } from 'src/app/modals/notice-details/notice-details';

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
    ComponentsModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentNoticePage],
  entryComponents: [NoticeDetails],
})
export class StudentNoticePageModule {}
