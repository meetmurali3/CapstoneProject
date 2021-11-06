import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  pdfObj : any;

  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dataService: DataServiceService,
    public navControl: NavController,
    public router: Router, public appComp: AppComponent) {
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
      vin: new FormControl('', Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      mileage: new FormControl('', Validators.required),
      bodilyInjuryCovInd: new FormControl(),
      propertyDmgCovInd: new FormControl(),
      medPayCovInd: new FormControl(),
      collisionCovInd: new FormControl(),
      unCovInd: new FormControl(),
      underInsCovInd: new FormControl(),
      requireUWApprovalInd: new FormControl(),
      uID: new FormControl(this.appComp.appUserID)
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

  createPDF(){
    const docDefinition = {
      content : [
        {text: [this.newPolicyForm.get('insuredAccount').value, ' ', this.newPolicyForm.get('policyStart').value]}
      ]
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
    this.pdfObj.download(); 
  }


  async createPolicyDoc() {
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
          text: '\n\nPolicy Contract',
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
              text: '\nPolicy Number      : ' + this.newPolicyForm.get('policyNumber').value
                + '\nPolicy starts on    : ' + this.newPolicyForm.get('policyStart').value.toString().substring(0, 10)
                + '\nPolicy expires on  : ' + this.newPolicyForm.get('policyEnd').value.toString().substring(0, 10),
              fontSize: 10, alignment: 'left'
            },
            {
              text: '\nVIN        : ' + this.newPolicyForm.get('vin').value
                + '\nMake     : ' + this.newPolicyForm.get('make').value
                + '\nModel    : ' + this.newPolicyForm.get('model').value
                + '\nMileage  : ' + this.newPolicyForm.get('mileage').value,
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
            'Bodily Injury Coverage                      : ' + (this.newPolicyForm.get('bodilyInjuryCovInd').value ? ' Included' : ' Excluded'),
            'Medical Payments Coverage           : ' + (this.newPolicyForm.get('medPayCovInd').value ? ' Included' : ' Excluded'),
            'Property Damage Coverage             : ' + (this.newPolicyForm.get('propertyDmgCovInd').value ? ' Included' : ' Excluded'),
            'Collision Coverage                             : ' + (this.newPolicyForm.get('collisionCovInd').value ? ' Included' : ' Excluded'),
            'Uninsured Motorist Coverage          : ' + (this.newPolicyForm.get('unCovInd').value ? ' Included' : ' Excluded'),
            'Underinsured Motorist Coverage    : ' + (this.newPolicyForm.get('underInsCovInd').value ? ' Included' : ' Excluded'),
          ],
          fontSize: 10
        },
        {
          text: '\n\nTotal premium to cover the vehicle and policy is $' + this.newPolicyForm.get('premium').value,
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