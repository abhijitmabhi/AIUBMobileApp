import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EmployeeDepartmentLeaveCalendarPage } from './employee-department-leave-calendar.page';
import {MatListModule} from '@angular/material/list';
const routes: Routes = [
  {
    path: '',
    component: EmployeeDepartmentLeaveCalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeDepartmentLeaveCalendarPage]
})
export class EmployeeDepartmentLeaveCalendarPageModule {}
