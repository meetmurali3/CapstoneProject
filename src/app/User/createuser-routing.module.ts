import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserPage } from './createuser.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserRoutingModule {}
