import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { AppComponent } from '../app.component';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  htmlSample: any;

  constructor(private activatedRoute: ActivatedRoute, 
              public appComponent : AppComponent, 
              public emailService : EmailService,
              public pdfGenerator: PDFGenerator) { 
    console.log(appComponent.appUserName);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  sendEmail() {
    let to = 'mgarapati1@live.maryville.edu';
    let cc  = '';
    let bcc = '';
    let attachment = '';
    let subject = "Please help";
    let body = "";
    //this.emailService.sendEmail(to, cc, bcc, attachment, subject, body);
    this.emailService.sendEmailUsingPWA();
  }
  
  generatePDF(){
    this.htmlSample = "<html><h1>Converted from HTML</h1></html>";
    let options = {
      documentSize: 'A4',
      type: 'share'
    }
 
    this.pdfGenerator.fromData(this.htmlSample, options).
      then(resolve => {
        console.log(resolve);
 
      }
      )
  }
}
