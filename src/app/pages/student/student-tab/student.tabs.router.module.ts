import { StudentTabPage } from '../student-tab/student-tab.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    component: StudentTabPage,
    children: [
      {
        path: 'studentHome',
        children: [
          {
            path: '',
            loadChildren: '../student-home/student-home.module#StudentHomePageModule'
          }
        ]
      },
    //   {
    //     path: 'employeeAttendance',
    //     children: [
    //       { 
    //         path: '',
    //         loadChildren: '../employee-attendance/employee-attendance.module#EmployeeAttendancePageModule'
    //       }
    //     ]
    //   },
      {
        path: 'studentProfile',
        children: [
          {
            path: '',
            loadChildren: '../student-profile/student-profile.module#StudentProfilePageModule'
          }
        ]
      },
    //   {
    //     path: 'employeeMenu',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: '../employee-menu/employee-menu.module#EmployeeMenuPageModule'
    //       }
    //     ]
    //   },
      {
        path: '',
        redirectTo: '/tabs/studentHome',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/studentHome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentTabsPageRoutingModule {}