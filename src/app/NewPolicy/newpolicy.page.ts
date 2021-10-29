import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { VariableDataService } from '../variable-data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './newpolicy.page.html',
  styleUrls: ['./newpolicy.page.scss'],
})

export class NewPolicyPage implements OnInit {
  public folder: string;
  public newPolicyForm: FormGroup;
  isSubmitted = false;
  insureds: any = [];
  policyNumber = "CAR3";
  errorMessage: string;

  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dataService: DataServiceService,
    public navControl: NavController,
    public router: Router, public variableDataService: VariableDataService) {
    this.getinsureds();
    this.generatePolicyNum();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getinsureds();
    });

  }

  ionViewDidLoad() {
    console.log("First load");
    this.getinsureds();
  }

  ionViewWillEnter() {
    this.generatePolicyNum();
  }

  generatePolicyNum() {
    if (this.policyNumber === "CAR3") {
      var ranNumber = Math.floor(Math.random() * 100000);
      console.log(ranNumber);
      this.policyNumber = this.policyNumber + ranNumber;

      console.log(this.policyNumber);
    }
    console.log(this.policyNumber);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.newPolicyForm = this.formBuilder.group({
      policyNumber: new FormControl(this.policyNumber),
      insuredAccount: new FormControl('', Validators.required),
      policyStart: new FormControl('', Validators.required),
      policyEnd: new FormControl('', Validators.required),
      premium: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      mileage: new FormControl('', Validators.required),
      bodilyInjuryCovInd: new FormControl(),
      propertyDmgCovInd: new FormControl(),
      medPayCovInd: new FormControl(),
      collisionCovInd: new FormControl(),
      unCovInd: new FormControl(),
      underInsCovInd: new FormControl(),
      requireUWApprovalInd: new FormControl()
    });
  }

  get errorControl() {
    return this.newPolicyForm.controls;
  }


  getinsureds() {
    return this.dataService.getInsureds().subscribe(
      b => this.insureds = b,
      error => this.errorMessage = <any>error);
  }

  submitForm() {
    this.isSubmitted = true;
    console.log(this.newPolicyForm.value);
    console.log(this.newPolicyForm.value['insuredAccount']);
    if (!this.newPolicyForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.dataService.addPolicy(this.newPolicyForm.value);
    }
    this.router.navigate(['/Home/Home']);
  }

}