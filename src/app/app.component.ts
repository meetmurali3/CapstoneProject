import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController} from '@ionic/angular';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //templateUrl: './pages/login/login.page.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [];
  public appUserName = "";
  public appUserID : any;
  public appUserRole : any;
  public newPolicyPages = [];
  constructor(public navCtrl: NavController, public router: Router, private menu: MenuController) {}

  ionViewDidLeave (){
    this.appUserID = '';
    this.appUserName = '';
    this.appUserRole = '';
  }

  onNewPolicy(){
    console.log("Adding Item");
    this.navCtrl.navigateRoot('/NewPolicy/newpolicy');
  }

  getAppPages(){
    if (this.appUserRole !== "Admin") {
      this.appPages.push({ title: 'Home', url: '/Home/home', icon: 'home' });
      this.appPages.push({ title: 'Insured Accounts', url: '/Insured/insured', icon: 'people-circle'});
      this.appPages.push({ title: 'New Policy', url: '/NewPolicy/newpolicy', icon: 'person' });
      if (this.appUserRole === "Underwriter") {
        this.appPages.push({ title: 'UW Approval', url: '/UWApproval', icon: 'checkmark' });
      }
      this.appPages.push({ title: 'Contact Support', url: '/folder/Support', icon: 'people' });
    } else {
      this.appPages.push({ title: 'Administration', url: '/Admin/admin', icon: 'cog' });
      this.appPages.push({ title: 'Contact Support', url: '/folder/Support', icon: 'people' });
    }
  }

  logOut(){
    console.log("Logging out");
    this.appUserID = null;
    this.appUserName = null;
    this.appUserRole = null;
    this.appPages = [];
    this.menu.enable(false);
    this.router.navigateByUrl('', { replaceUrl: true });
  }
}