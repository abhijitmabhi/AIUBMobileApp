import { MaterialModule } from 'src/app/Core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeProfilePage } from './employee-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeProfilePage
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
  declarations: [EmployeeProfilePage]
})
export class EmployeeProfilePageModule {}
