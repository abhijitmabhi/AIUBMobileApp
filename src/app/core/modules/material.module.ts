import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatSelectModule,
  MatExpansionModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRippleModule,
} from "@angular/material";
 
@NgModule({
  exports: [
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatRippleModule,
  ]
})
export class MaterialModule {}
