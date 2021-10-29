import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NewPolicyPage } from '../NewPolicy/newpolicy.page';
import { VariableDataService } from '../variable-data.service';
@Component({
  selector: 'app-folder',
  templateUrl: './policyinfo.page.html',
  styleUrls: ['./policyinfo.page.scss'],
})
export class PolicyInfoPage implements OnInit {
  public folder: string;
  public policyForm: FormGroup;
  isSubmitted = false;


  constructor(private activatedRoute: ActivatedRoute, 
              public formBuilder: FormBuilder,
              public dataService : DataServiceService,
              public navControl : NavController,
              private router: Router, private newPolPage: NewPolicyPage,
              public variableDataService : VariableDataService) {
                this.activatedRoute.queryParams.subscribe((res)=>{
                  console.log(res);
              });

   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.policyForm = this.formBuilder.group({
      pStartDate: new FormControl('pStartDate', Validators.required)

    })

  }

  get errorControl() {
    return this.policyForm.controls;
  }


  

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.policyForm.get('pStartDate').setValue(date, {
      onlyself: true
    })
  }




  submitForm() {
    this.isSubmitted = true;
    if (!this.policyForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.policyForm.value)
     // this.dataService.addInsured(this.policyForm.value);
    }
  }

  goBack() {
    console.log("click of back on policyinfo");
    console.log(this.variableDataService);
    this.router.navigate(['/NewPolicy/newpolicy'])

  }
}
