import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPolicyPageRoutingModule } from './newpolicy-routing.module';

import { NewPolicyPage } from './newpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPolicyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewPolicyPage]
})
export class NewPolicyPageModule {}
