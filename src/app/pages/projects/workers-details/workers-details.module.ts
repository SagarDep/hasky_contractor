import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkersDetailsPage } from './workers-details.page';
import { InfoWorkerPage } from '../../../modal/info-worker/info-worker.page';
import { InfoWorkerPageModule } from '../../../modal/info-worker/info-worker.module';
import { StarRatingModule } from 'ionic4-star-rating';

const routes: Routes = [
  {
    path: '',
    component: WorkersDetailsPage
  }
];

@NgModule({
  entryComponents: [
    InfoWorkerPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    RouterModule.forChild(routes),
    InfoWorkerPageModule
  ],
  declarations: [WorkersDetailsPage]
})
export class WorkersDetailsPageModule {}
