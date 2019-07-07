import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StudentTabPage } from './student-tab.page';
import { StudentTabsPageRoutingModule } from './student.tabs.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTabsPageRoutingModule
  ],
  declarations: [StudentTabPage]
})
export class StudentTabPageModule {}
