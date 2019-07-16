import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GetStudentListPage } from './get-student-list.page';
import { MaterialModule } from 'src/app/core/modules/material.module';

const routes: Routes = [
  {
    path: '',
    component: GetStudentListPage
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
  declarations: [GetStudentListPage]
})
export class GetStudentListPageModule {}
