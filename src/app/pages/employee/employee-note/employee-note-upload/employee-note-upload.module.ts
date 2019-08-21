import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeNoteUploadPage } from './employee-note-upload.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeNoteUploadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeNoteUploadPage]
})
export class EmployeeNoteUploadPageModule {}
