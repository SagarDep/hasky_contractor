import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StripePage } from './stripe.page';
import { MbscModule } from '@mobiscroll/angular';

const routes: Routes = [
  {
    path: '',
    component: StripePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MbscModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StripePage]
})
export class StripePageModule {}
