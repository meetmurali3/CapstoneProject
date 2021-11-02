import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UWPage } from './uw.page';

const routes: Routes = [
  {
    path: '',
    component: UWPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UWPageRoutingModule {}
