import { EmployeeTabsPageRoutingModule } from './employee.tabs.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeTabPage } from './employee-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeTabsPageRoutingModule,
  ],
  declarations: [EmployeeTabPage]
})
export class EmployeeTabPageModule {}
