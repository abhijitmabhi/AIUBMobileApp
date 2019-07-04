import { EmployeeTabPage } from './employee-tab.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    component: EmployeeTabPage,
    children: [
      {
        path: 'employeeHome',
        children: [
          {
            path: '',
            loadChildren: '../employee-home/employee-home.module#EmployeeHomePageModule'
          }
        ]
      },
      {
        path: 'employeeAttendance',
        children: [
          { 
            path: '',
            loadChildren: '../employee-attendance/employee-attendance.module#EmployeeAttendancePageModule'
          }
        ]
      },
      {
        path: 'employeeProfile',
        children: [
          {
            path: '',
            loadChildren: '../employee-profile/employee-profile.module#EmployeeProfilePageModule'
          }
        ]
      },
      // {
      //   path: '',
      //   redirectTo: '/Tabs/Home',
      //   pathMatch: 'full'
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/employeeHome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeTabsPageRoutingModule {}