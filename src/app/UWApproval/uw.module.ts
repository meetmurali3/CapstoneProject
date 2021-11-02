import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UWPageRoutingModule } from './uw-routing.module';

import { UWPage } from './uw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UWPageRoutingModule
  ],
  declarations: [UWPage]
})
export class UWPageModule {}
