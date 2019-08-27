import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationsPage } from './notifications.page';
import { ModalsModule } from '../../../modals/modals.module';
import { NotificationDetails } from '../../../modals/notification-details/notification-details';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ModalsModule
  ],
  declarations: [NotificationsPage],
  entryComponents: [NotificationDetails],
})
export class NotificationsPageModule {}
