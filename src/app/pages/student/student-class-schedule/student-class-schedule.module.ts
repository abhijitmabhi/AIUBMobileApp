import { MaterialModule } from './../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentClassSchedulePage } from './student-class-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: StudentClassSchedulePage
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
  declarations: [StudentClassSchedulePage]
})
export class StudentClassSchedulePageModule {}
