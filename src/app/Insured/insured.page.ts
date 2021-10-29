import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { VariableDataService } from '../variable-data.service';
@Component({
  selector: 'app-folder',
  templateUrl: './insured.page.html',
  styleUrls: ['./insured.page.scss'],
})
export class InsuredPage implements OnInit {
  public folder: string;
  public insuredForm: FormGroup;
  isSubmitted = false;
  insured:any = [];
  insureds:any = [];
  errorMessage : string;

  constructor(public activatedRoute: ActivatedRoute, 
              public formBuilder: FormBuilder,
              public dataService : DataServiceService,
              public navControl : NavController,
              public router: Router, public variableDataService : VariableDataService) {
                this.getinsureds();
                dataService.dataChanged$.subscribe((dataChanged: boolean) => {
                  this.getinsureds();
                });

   }

   ionViewDidLoad(){
    console.log("First load");
    this.getinsureds();
  }

  ionViewDidEnter(){
    console.log("did load");
    this.getinsureds();
  }


   ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.insuredForm = this.formBuilder.group({
      firstName: new FormControl('firstName', Validators.required),
      lastName: new FormControl('lastName', Validators.required),
      dob: new FormControl('dob', Validators.required),
      email: new FormControl('email', Validators.required),
      gender: new FormControl('gender', Validators.required),
    })


  }

  get errorControl() {
    return this.insuredForm.controls;
  }


  getInsured(id){
    return this.dataService.getInsured(id).subscribe(
      items => this.insured = items,
      error => this.errorMessage = <any>error);

  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.insuredForm.get('dob').setValue(date, {
      onlyself: true
    });
  }


  getinsureds () {
    return this.dataService.getInsureds().subscribe(
                          b => this.insureds = b,
                          error => this.errorMessage = <any>error);
  }



}
