import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyInfoPageRoutingModule } from './policyinfo-routing.module';

import { PolicyInfoPage } from './policyinfo.page';
import { VariableDataService } from '../variable-data.service';
import { NewPolicyPage } from '../NewPolicy/newpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PolicyInfoPage],
  providers: [VariableDataService, NewPolicyPage]
})
export class PolicyInfoPageModule {}
