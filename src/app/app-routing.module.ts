import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  // { path: 'employee-home', loadChildren: './pages/employee/employee-home/employee-home.module#EmployeeHomePageModule' },
  { path: 'employee-tab', loadChildren: './pages/employee/employee-tab/employee-tab.module#EmployeeTabPageModule' },
  { path: 'employee-class-schedule', loadChildren: './pages/employee/employee-class-schedule/employee-class-schedule.module#EmployeeClassSchedulePageModule' },

  //student
  { path: 'student-tab', loadChildren: './pages/student/student-tab/student-tab.module#StudentTabPageModule' },
  // { path: 'student-profile', loadChildren: './pages/student/student-profile/student-profile.module#StudentProfilePageModule' },
  // { path: 'student-menu', loadChildren: './pages/student/student-menu/student-menu.module#StudentMenuPageModule' },

  // { path: 'student-home', loadChildren: './pages/student/student-home/student-home.module#StudentHomePageModule' },


  // { path: 'employee-menu', loadChildren: './pages/employee/employee-menu/employee-menu.module#EmployeeMenuPageModule' },
  // { path: 'employee-profile', loadChildren: './pages/employee/employee-profile/employee-profile.module#EmployeeProfilePageModule' },
  // { path: 'employee-attendance', loadChildren: './pages/employee/employee-attendance/employee-attendance.module#EmployeeAttendancePageModule' }

  // common
  {  path: 'notifications', loadChildren: './pages/common/notifications/notifications.module#NotificationsPageModule' },
  { path: 'student-class-schedule', loadChildren: './pages/student/student-class-schedule/student-class-schedule.module#StudentClassSchedulePageModule' },
  { path: 'get-student-list/:sectionId', loadChildren: './pages/employee/get-student-list/get-student-list.module#GetStudentListPageModule' },
  { path: 'employee-notice/:sectionId', loadChildren: './pages/employee/employee-notice/employee-notice.module#EmployeeNoticePageModule' },
  { path: 'student-notes/:sectionId', loadChildren: './pages/student/student-notes/student-notes.module#StudentNotesPageModule' },
  { path: 'student-notice/:sectionId', loadChildren: './pages/student/student-notice/student-notice.module#StudentNoticePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}