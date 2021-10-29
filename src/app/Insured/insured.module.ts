import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuredPageRoutingModule } from './insured-routing.module';

import { InsuredPage } from './insured.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuredPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InsuredPage]
})
export class InsuredPageModule {}
