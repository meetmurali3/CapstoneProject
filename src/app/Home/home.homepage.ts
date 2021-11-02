import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { DataServiceService } from '../data-service.service';
import { EmailService } from '../email.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-folder',
  templateUrl: './home.homepage.html',
  styleUrls: ['../home/home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;
  policies: any = [];
  insured: any;
  errorMessage: string;
  map = new Map();
  pdfObj : any;
  constructor(private activatedRoute: ActivatedRoute,
    private appComp: AppComponent,
    private dataService: DataServiceService, public emailService: EmailService) {
    this.getPolicies();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getPolicies();
    });
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPolicies();
  }

  ionViewDidLoad() {
    console.log("First load");
    this.getPolicies();
  }

  /***
  * This function returns the list of policies of the logged in user
  */
  getPolicies() {
    return this.dataService.getPoliciesOfUser(this.appComp.appUserID).subscribe(
      data => {this.policies = data,
        console.log(data),
        this.policies.forEach(pol => {
          this.getInsuredOfPolicy(`${pol.InsuredAccountId}`, `${pol.policyNumber}`);
        })              
      },
      error => this.errorMessage = <any>error);
  }

  /***
* This function returns the list of policies of the logged in user
*/
  populateData() {
    console.log("in ");
    console.log(this.policies);
    for (let pol in this.policies){
      console.log("policy - ",pol);
    }
  }

  /***
  * This function returns the list of policies of the logged in user
  */
  getInsuredOfPolicy(accountID, policyNumber) {
    return this.dataService.getInsuredOfPolicy(accountID).subscribe(
      a => {this.insured = a,
        this.map.set(policyNumber, this.insured)
      },
      error => this.errorMessage = <any>error);
  }

/**
  * This function returns the vehicle details in string format
  */
     getVehDetails (policy) {
      return policy.Vehicles[0].year + ' ' 
            + policy.Vehicles[0].make  + ' ' 
            + policy.Vehicles[0].model;
    }

  sendIDCard(policy) {
    let to = 'mgarapati1@live.maryville.edu';
    let cc = '';
    let bcc = '';
    let attachment = '';
    let subject = "Please help";
    let body = "";
    //this.emailService.sendEmail(to, cc, bcc, attachment, subject, body);
    //this.getInsuredOfPolicy(policy.InsuredAccountId);
    this.emailService.sendIDCardUsingPWA(policy, this.map.get(policy.policyNumber));
  }


  createPDF(policy, ins){
    const docDefinition = {
      content : [
        {text: [policy.policyNumber, ' ', policy.policyStart, ' ', ins.firstName]}
      ]
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
    this.pdfObj.download(); 
  }

  fullName(ins) {
    return ins.firstName + ' ' + ins.lastName;
  }
}
