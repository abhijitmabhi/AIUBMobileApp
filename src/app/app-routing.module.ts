import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login/login.module#LoginPageModule' },

  //Employee
  { path: 'employee-tab', loadChildren: './pages/employee/employee-tab/employee-tab.module#EmployeeTabPageModule' },
  { path: 'employee-class-schedule', loadChildren: './pages/employee/employee-class-schedule/employee-class-schedule.module#EmployeeClassSchedulePageModule' },
  { path: 'get-student-list/:sectionId', loadChildren: './pages/employee/get-student-list/get-student-list.module#GetStudentListPageModule' },
  { path: 'employee-notice/:sectionId', loadChildren: './pages/employee/employee-notice/employee-notice.module#EmployeeNoticePageModule' },

  //Student
  { path: 'student-tab', loadChildren: './pages/student/student-tab/student-tab.module#StudentTabPageModule' },
  { path: 'student-notes/:sectionId', loadChildren: './pages/student/student-notes/student-notes.module#StudentNotesPageModule' },
  { path: 'student-class-schedule', loadChildren: './pages/student/student-class-schedule/student-class-schedule.module#StudentClassSchedulePageModule' },
  { path: 'student-notice/:sectionId', loadChildren: './pages/student/student-notice/student-notice.module#StudentNoticePageModule' },
  { path: 'courses-and-results-details', loadChildren: './pages/student/student-courses-and-results/courses-and-results-details/courses-and-results-details.module#CoursesAndResultsDetailsPageModule' },

  // common
  {  path: 'notifications', loadChildren: './pages/common/notifications/notifications.module#NotificationsPageModule' },
  { path: 'user-feedback', loadChildren: './pages/common/user-feedback/user-feedback.module#UserFeedbackPageModule' }


  // { path: 'student-courses-and-results', loadChildren: './pages/student/student-courses-and-results/student-courses-and-results.module#StudentCoursesAndResultsPageModule' },
  
  // { path: 'employee-home', loadChildren: './pages/employee/employee-home/employee-home.module#EmployeeHomePageModule' },
  // { path: 'student-profile', loadChildren: './pages/student/student-profile/student-profile.module#StudentProfilePageModule' },
  // { path: 'student-menu', loadChildren: './pages/student/student-menu/student-menu.module#StudentMenuPageModule' },
  // { path: 'student-home', loadChildren: './pages/student/student-home/student-home.module#StudentHomePageModule' },
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