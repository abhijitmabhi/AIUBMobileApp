import { MaterialModule } from 'src/app/Core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeMenuPage } from './employee-menu.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeMenuPage
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
  declarations: [EmployeeMenuPage]
})
export class EmployeeMenuPageModule {}
