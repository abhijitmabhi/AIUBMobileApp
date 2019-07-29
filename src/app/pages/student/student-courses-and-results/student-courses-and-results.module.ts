import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentCoursesAndResultsPage } from './student-courses-and-results.page';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: StudentCoursesAndResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatRippleModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentCoursesAndResultsPage]
})
export class StudentCoursesAndResultsPageModule {}

