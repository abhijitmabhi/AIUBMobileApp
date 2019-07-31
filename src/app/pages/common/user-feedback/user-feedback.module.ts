import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './../../../core/modules/material.module';
import { IonicModule } from '@ionic/angular';

import { UserFeedbackPage } from './user-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: UserFeedbackPage
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
  declarations: [UserFeedbackPage]
})
export class UserFeedbackPageModule {}
