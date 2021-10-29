import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { VariableDataService } from '../variable-data.service';
@Component({
  selector: 'app-folder',
  templateUrl: './createinsured.page.html',
  styleUrls: ['./createinsured.page.scss'],
})
export class CreateInsuredPage implements OnInit {
  public folder: string;
  public insuredForm: FormGroup;
  isSubmitted = false;
  insureds: any = [];
  errorMessage: string;

  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dataService: DataServiceService,
    public navControl: NavController,
    public router: Router) {
    this.getinsureds();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getinsureds();
    });

  }

  ionViewDidLoad() {
    console.log("First load");
    this.getinsureds();
  }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.insuredForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      addrLine1: new FormControl('', Validators.required),
      //addrLine2: new FormControl(),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
    })


  }

  get errorControl() {
    return this.insuredForm.controls;
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.insuredForm.get('dob').setValue(date, {
      onlyself: true
    });
  }


  getinsureds() {
    return this.dataService.getInsureds().subscribe(
      b => this.insureds = b,
      error => this.errorMessage = <any>error);
  }


  submitForm() {
    this.isSubmitted = true;
    if (!this.insuredForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      //console.log("in add", this.insuredForm.get('firstName').value);
      this.dataService.addInsured(this.insuredForm.value);
    }
    this.getinsureds();
    this.router.navigate(['/Insured/insured']);

  }
}
