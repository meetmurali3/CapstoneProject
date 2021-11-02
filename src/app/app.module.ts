import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from './email.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule,
    ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, EmailComposer, EmailService, PDFGenerator],
  bootstrap: [AppComponent],
})
export class AppModule {}
