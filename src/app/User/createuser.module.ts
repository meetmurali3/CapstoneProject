import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateUserRoutingModule } from './createuser-routing.module';
import { CreateUserPage } from './createuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateUserPage]
})
export class CreateUserPageModule {}
