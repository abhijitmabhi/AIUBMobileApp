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
      {
        path: 'studentProfile',
        children: [
          {
            path: '',
            loadChildren: '../student-profile/student-profile.module#StudentProfilePageModule'
          }
        ]
      },
      {
        path: 'studentMenu',
        children: [
          {
            path: '',
            loadChildren: '../student-menu/student-menu.module#StudentMenuPageModule'
          }
        ]
      },
      {
        path: 'studentCoursesANDresults',
        children: [
          {
            path: '',
            loadChildren: '../student-courses-and-results/student-courses-and-results.module#StudentCoursesAndResultsPageModule'
          }
        ]
      },
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