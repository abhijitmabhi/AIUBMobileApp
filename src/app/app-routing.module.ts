import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  // { path: 'employee-home', loadChildren: './pages/employee/employee-home/employee-home.module#EmployeeHomePageModule' },
  { path: 'employee-tab', loadChildren: './pages/employee/employee-tab/employee-tab.module#EmployeeTabPageModule' },
  { path: 'employee-class-schedule', loadChildren: './pages/employee/employee-class-schedule/employee-class-schedule.module#EmployeeClassSchedulePageModule' },
  // { path: 'employee-menu', loadChildren: './pages/employee/employee-menu/employee-menu.module#EmployeeMenuPageModule' },
  // { path: 'employee-profile', loadChildren: './pages/employee/employee-profile/employee-profile.module#EmployeeProfilePageModule' },
  // { path: 'employee-attendance', loadChildren: './pages/employee/employee-attendance/employee-attendance.module#EmployeeAttendancePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}