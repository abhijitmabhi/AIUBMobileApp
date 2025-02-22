import { ComponentsModule } from 'src/app/core/components/components.module';
import { MaterialModule } from './../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentHomePage } from './student-home.page';

const routes: Routes = [
  {
    path: '',
    component: StudentHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentHomePage]
})
export class StudentHomePageModule {}
