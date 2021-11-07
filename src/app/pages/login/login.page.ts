import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  data: any;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public dataService: DataServiceService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private router: Router,
    private loadingController: LoadingController,
    public appComponent: AppComponent,
    private menu: MenuController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  /**
   * This function presents alert if login failed
   */
  presentAlert() {
    this.alertController.create({
      header: 'Login Failed.',
      message: 'Please enter valid credentials',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  /**
  * This is the login function that authenticates login credentials
  */
  login() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please enter all the fields!');
      return false;
    } else {
      this.dataService.verifyUserLogin(this.loginForm.value).then((result) => {
        this.data = result;
        console.log(this.data);
        if (this.data) {
          this.menu.enable(true);
          console.log(`${this.data.id}`);
          this.appComponent.appUserID = `${this.data.id}`;
          this.appComponent.appUserRole = `${this.data.roleName}`;
          console.log(this.appComponent.appUserID);
          console.log(this.appComponent.appUserRole);
          this.appComponent.appUserName = this.loginForm.get('login').value;
          console.log(this.appComponent.appUserName);
          this.appComponent.getAppPages();
          this.router.navigate(['/Home/home']);
        } else {
          this.presentAlert();
        }
      }, (err) => {
      });
    }
  }

}
