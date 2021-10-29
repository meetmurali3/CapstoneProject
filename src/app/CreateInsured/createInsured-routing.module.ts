import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateInsuredPage } from './createinsured.page';

const routes: Routes = [
  {
    path: '',
    component: CreateInsuredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateInsuredPageRoutingModule {}
