import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
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


  constructor(
    public formBuilder: FormBuilder,
    public dataService: DataServiceService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private router: Router,
    private loadingController: LoadingController,
    public appComponent : AppComponent
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  presentAlert() {
    this.alertController.create({
      header: 'Alert',
      message: 'Login Failed.',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  login() {
    if (!this.loginForm.valid) {
      console.log('Please enter all the fields!');
      return false;
    } else {
      this.dataService.verifyUserLogin(this.loginForm.value).then((result) => {
        this.data = result;
        if (this.data) {
          this.appComponent.appUserName = this.loginForm.get('login').value;
          console.log(this.appComponent.appUserName);
          this.router.navigate(['/Home/home']);
        } else {
          this.presentAlert();
        }
      }, (err) => {
      });
    }
  }

}
