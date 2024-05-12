import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MajorMinorComponent } from './major-minor.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MajorMinorComponent }
    ])
  ]
})
export class MajorMinorModule { }
