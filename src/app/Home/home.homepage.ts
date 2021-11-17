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
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;
  policies: any = [];
  insured: any;
  errorMessage: string;
  map = new Map();
  pdfObj: any;
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

   /**
    * This function returns the vehicle details in string format
    */
    getVehDetails(policy) {
      return policy.Vehicles[0].year + ' '
        + policy.Vehicles[0].make + ' '
        + policy.Vehicles[0].model;
    }
    
/***
  * This function returns the list of policies of the logged in user
  * It calls the service layer endpoint through the dataservice 
  * to get list of policies created by the logged-in user
  */
  getPolicies() {
    return this.dataService.getPoliciesOfUser(this.appComp.appUserID).subscribe(
      data => {
        this.policies = data,
          console.log(data),
          this.policies.forEach(pol => {
            this.getInsuredOfPolicy(`${pol.InsuredAccountId}`, `${pol.policyNumber}`);
          })
      },
      error => this.errorMessage = <any>error);
  }

  /***
  * This function returns insured of each policy created by the logged in user
  */
  getInsuredOfPolicy(accountID, policyNumber) {
    return this.dataService.getInsuredOfPolicy(accountID).subscribe(
      a => {
        this.insured = a,
          this.map.set(policyNumber, this.insured)
      },
      error => this.errorMessage = <any>error);
  }

  /***
  * This function is used to send ID card email.
  */
   sendIDCard(policy) {
    this.emailService.sendIDCardUsingPWA(policy, this.map.get(policy.policyNumber));
  }

/***
  * This function used PDFMake feature and generated policy contract document.
  */
  async createPolicyDoc(policy, ins) {
    const docDefinition = {
      content: [

        {
          image: await this.getBase64ImageFromURL("../../assets/icon/AppLogo.jpg"),
          width: 50
        },
        {
          text: '\nABC Insurance Corporation\n600 Campus Dr\nForhamPark\nNJ 07932',
          style: 'header',
          fontSize: 10
        },
        {
          text: '\n\nPolicy Contract for ' + ins.firstName + ' ' + ins.lastName,
          style: 'header',
          fontSize: 12, bold: true, color: 'blue', alignment: 'center'
        },
        {
          text: '\n\nHere are the contract details. The carrier will only cover the damages that are relevant to the below mentioned coverages.\n',
          fontSize: 10
        },
        {
          columns: [
            {
              text: '\nPolicy Number      : ' + policy.policyNumber
                + '\nPolicy starts on    : ' + policy.policyStart.toString().substring(0, 10)
                + '\nPolicy expires on  : ' + policy.policyEnd.toString().substring(0, 10),
              fontSize: 10, alignment: 'left'
            },
            {
              text: '\nVIN        : ' + policy.Vehicles[0].vin
                + '\nMake     : ' + policy.Vehicles[0].make
                + '\nModel    : ' + policy.Vehicles[0].model
                + '\nMileage  : ' + policy.Vehicles[0].mileage,
              fontSize: 10, alignment: 'left'
            }
          ]
        },
        {
          text: '\nBelow are the coverage details.\n',
          fontSize: 10
        },
        {
          ol: [
            'Bodily Injury Coverage                      : ' + (policy.Coverages[0].bodilyInjuryCovInd ? ' Included' : ' Excluded'),
            'Medical Payments Coverage           : ' + (policy.Coverages[0].medPayCovInd ? ' Included' : ' Excluded'),
            'Property Damage Coverage             : ' + (policy.Coverages[0].propertyDmgCovInd ? ' Included' : ' Excluded'),
            'Collision Coverage                             : ' + (policy.Coverages[0].collisionCovInd ? ' Included' : ' Excluded'),
            'Uninsured Motorist Coverage          : ' + (policy.Coverages[0].unCovInd ? ' Included' : ' Excluded'),
            'Underinsured Motorist Coverage    : ' + (policy.Coverages[0].underInsCovInd ? ' Included' : ' Excluded'),
          ],
          fontSize: 10
        },
        {
          text: '\n\nTotal premium to cover the vehicle and policy is $' + policy.premium,
          fontSize: 11
        },
        {
          text: '\n\nRead this policy with care.'
            + 'This is a legal contract between the policy holder and ABC Insurance corporation.'
            + 'In the event, the policy holder needs to contact someone about the policy he / she '
            + 'can contact the insurance agent. Or for any additional questions we can be reached at '
            + 'mgarapat1@live.maryville.edu',
          fontSize: 9
        },
        {
          text: '\n\n\nMuralidhar Garapati',
          fontSize: 10, alignment: 'right'
        },
        {
          text: 'Vice President',
          fontSize: 10, bold: true, alignment: 'right'
        },
      ]
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
    this.pdfObj.download();
  }

  /***
  * This function used PDFMake feature and generated insurance ID card in PDF format.
  */
  async createIDCard(policy, ins) {
    const docDefinition = {
      content: [
        {
          image: await this.getBase64ImageFromURL("../../assets/icon/AppLogo.jpg"),
          width: 50
        },
        {
          text: '\nABC Insurance Corporation\n600 Campus Dr\nForhamPark\nNJ 07932',
          style: 'header',
          fontSize: 10
        },
        {
          text: '\n\nInsurance identification Card',
          style: 'header',
          fontSize: 12, bold: true, color: 'blue', alignment: 'center'
        },
        {
          canvas:
            [{
              type: 'line',
              x1: 0, y1: 50,
              x2: 500, y2: 50,
              lineWidth: 1
            }]
        },
        {
          columns: [
            {
              text: '\nPolicy Number',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.policyNumber,
              fontSize: 10, color: 'blue', alignment: 'justify'
            },
            {
              text: '\nEffective Date',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.policyStart.toString().substring(0, 10),
              fontSize: 10, color: 'blue', alignment: 'justify'
            }
          ]
        },
        {
          columns: [
            {
              text: '\nInsured',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + ins.firstName + ' ' + ins.lastName,
              fontSize: 10, color: 'blue', alignment: 'justify'
            },
            {
              text: '\nExpiration Date',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.policyEnd.toString().substring(0, 10),
              fontSize: 10, color: 'blue', alignment: 'justify'
            }
          ]
        },
        {
          columns: [
            {
              text: '\nVIN',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.Vehicles[0].vin,
              fontSize: 10, color: 'blue', alignment: 'justify'
            },
            {
              text: '\nYear',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.Vehicles[0].year,
              fontSize: 10, color: 'blue', alignment: 'justify'
            }
          ]
        },
        {
          columns: [
            {
              text: '\nModel',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.Vehicles[0].model,
              fontSize: 10, color: 'blue', alignment: 'justify'
            },
            {
              text: '\nMake',
              fontSize: 12, alignment: 'justify'
            },
            {
              text: '\n' + policy.Vehicles[0].make,
              fontSize: 10, color: 'blue', alignment: 'justify'
            }
          ]
        },
        {
          text: '\n\nThis policy comes with Emergency Roadside Service.',
          fontSize: 10,
        },
        {
          canvas:
            [{
              type: 'line',
              x1: 0, y1: 40,
              x2: 500, y2: 40,
              lineWidth: 1
            }]
        },
      ]
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
    this.pdfObj.download();
  }


  fullName(ins) {
    return ins.firstName + ' ' + ins.lastName;
  }

  /**
   * This function is used to convert the application logo 
   * to readable format of PDFMake to print it on the ID card or Policy contract document
   */
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

}
