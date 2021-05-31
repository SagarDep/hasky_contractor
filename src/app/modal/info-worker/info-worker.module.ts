import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { InfoWorkerPage } from './info-worker.page';
import { StarRatingModule } from 'ionic4-star-rating';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StarRatingModule,
    IonicModule
  ],
  declarations: [InfoWorkerPage]
})
export class InfoWorkerPageModule {}
