import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationsPage } from './notifications.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { NotificationDetails } from 'src/app/core/components/pop-up/notification-details/notification-details';

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
    ComponentsModule
  ],
  declarations: [NotificationsPage],
  entryComponents: [NotificationDetails],
})
export class NotificationsPageModule {}
