import { MaterialModule } from './../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeHomePage } from './employee-home.page';
import { NotificationDetails } from 'src/app/core/components/pop-up/notification-details/notification-details';
import { ComponentsModule } from 'src/app/core/components/components.module';


const routes: Routes = [
  {
    path: '',
    component: EmployeeHomePage
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
  declarations: [EmployeeHomePage],
  entryComponents: [NotificationDetails]
})
export class EmployeeHomePageModule {}
