import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditCompanyPage } from './edit-company.page';
import { ComponentsModule } from '../../../components/components.module';
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: '',
    component: EditCompanyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditCompanyPage]
})
export class EditCompanyPageModule {}
