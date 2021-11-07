import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './createuser.page.html',
  styleUrls: ['../NewPolicy/newpolicy.page.scss'],
})
export class CreateUserPage implements OnInit {
  public folder: string;
  public userForm: FormGroup;
  errorMessage: string;
  isSubmitted = false;

  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dataService: DataServiceService,
    public navControl: NavController,
    public router: Router) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      roleName: new FormControl('', Validators.required)
    })
  }

  get errorControl() {
    return this.userForm.controls;
  }

  /***
  * This form submission function checks if all the required fields are filled.
  * If there are no validations the it calls the dataservice (that calls the service layer endpoint)
  * to create new user.
  * This calls dataservice addUser()
  */
  submitForm() {
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log("in else");
      console.log(this.userForm.value);
      this.dataService.addUser(this.userForm.value);
      this.router.navigate(['/Admin/admin']);
    }

  }
}
