import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateInsuredPageRoutingModule } from './createInsured-routing.module';

import { CreateInsuredPage } from './createinsured.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateInsuredPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateInsuredPage]
})
export class CreateInsuredPageModule {}
