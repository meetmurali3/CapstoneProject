import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyInfoPage } from './policyinfo.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyInfoPageRoutingModule {}
