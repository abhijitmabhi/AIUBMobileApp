import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

import { IonicModule } from '@ionic/angular';

import { CoursesAndResultsDetailsPage } from './courses-and-results-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoursesAndResultsDetailsPage
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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoursesAndResultsDetailsPage]
})
export class CoursesAndResultsDetailsPageModule {}
