import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-folder',
  templateUrl: './uw.page.html',
  styleUrls: ['./uw.page.scss'],
})
export class UWPage implements OnInit {
  public folder: string;
  policies: any = [];
  errorMessage: string;
  constructor(private activatedRoute: ActivatedRoute,
    private appComp: AppComponent,
    private dataService: DataServiceService) {
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
    return this.dataService.getUWReferedPolicies().subscribe(
      a => this.policies = a,
      error => this.errorMessage = <any>error);
  }

  /***
* This function allows underwriter to record his/her decision on the policy.
* If Underwriter feels it is too risky for the carrier to insure the policy he/she may reject the policy.
* Calls the service layer to update the policy record.
*/
  setUWDecision(policy, decision) {
    policy['isUWApprovedInd'] = decision;
    console.log(policy);
    this.dataService.setUWDecision(policy);
  }


  /**
    * This function returns the vehicle details in string format
    */
  getVehDetails(policy) {
    return policy.Vehicles[0].year + ' '
      + policy.Vehicles[0].make + ' '
      + policy.Vehicles[0].model;
  }
}
