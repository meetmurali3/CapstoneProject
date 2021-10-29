import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //templateUrl: './pages/login/login.page.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/Home/home', icon: 'home' },
    { title: 'Insured Accounts', url: '/Insured/insured', icon: 'people-circle' },
    { title: 'New Policy', url: '/NewPolicy/newpolicy', icon: 'person' },
    { title: 'UW Approval', url: '/folder/UWApproval', icon: 'checkmark' },
    { title: 'Administration', url: '/Admin/admin', icon: 'cog' },
    { title: 'Contact Support', url: '/folder/Support', icon: 'people' },
  ];
  public newPolicy = false;
  public appUserName = "";

  public newPolicyPages = [
/**
    { title: 'Policy Info', url: '/PolicyInfo/policyinfo', icon: 'car' },
    { title: 'Vehicle Info', url: '/NewPolicy/newpolicy', icon: 'car' },
    { title: 'Coverages', url: '/NewPolicy/Coverage', icon: 'shield-checkmark' },
    { title: 'Quote and Issue', url: '/NewPolicy/Quote', icon: 'cash' }, */
  ];
  constructor(public navCtrl: NavController, public router: Router) {}

  ionViewDidLeave (){
    this.appUserName = '';
  }

  onNewPolicy(){
    console.log("Adding Item");
    this.newPolicy = true;
    this.navCtrl.navigateRoot('/NewPolicy/newpolicy');
  }

  logOut(){
    console.log("Logging out");
    this.appUserName = '';
    //this.navCtrl.navigateRoot(['/home'], { replaceUrl: true });
    this.navCtrl.navigateRoot('');
  }
}