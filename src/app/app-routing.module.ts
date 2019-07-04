import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login/login.module#LoginPageModule' },
  // { path: 'employee-home', loadChildren: './pages/employee/employee-home/employee-home.module#EmployeeHomePageModule' },
  { path: 'employee-tab', loadChildren: './pages/employee/employee-tab/employee-tab.module#EmployeeTabPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}