import { Injectable } from '@angular/core';
import { EmailComposer  } from '@ionic-native/email-composer/ngx';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private emailComposer: EmailComposer ) { }

  /**
    *
    * @public
    * @method sendMail
    * @param to    			{string}    The primary e-mail address
    * @param cc    			{string}    The carbon copy e-mail address
    * @param bcc   			{string}    The blank carbon copy e-mail address
    * @param attachment     {string}    The attachment to be sent
    * @param subject        {string}    The subject for the e-mail message
    * @param body           {string}    The message content
    *
    */
  sendEmail(to: string,
    cc: string,
    bcc: string,
    attachment: string,
    subject: string,
    body: string): void {

      let email: any = {
        app: 'mailto',
        to: to,
        cc: cc,
        bcc: bcc,
        attachments: [
          attachment
        ],
        subject: subject,
        body: body
      };

      // Open the device e-mail client and create 
      // a new e-mail message populated with the 
      // object containing our message data
      this.emailComposer.open(email);

  }

  sendEmailUsingPWA(){
    Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  sendIDCardUsingPWA(policy, insured){
    Share.share({
      title: 'ID Card',
      text: 'Here is your ID card \n'
      + 'Please print, cut and use these card.\n'
      + '\n \n'
      + '===================cut here========================\n'
      + 'Policy Number\t\t: '+ policy.policyNumber + '\n'
      + 'Effective Date\t\t: '+ policy.policyStart + '\n'
      + 'Policy expires on\t: '+ policy.policyEnd + '\n'
      + 'Policy expires on\t: '+ policy.policyEnd + '\n'
      + 'Vehicle Year\t: '+ policy.Vehicles[0].year + '\n'
      + 'Vehicle Make\t: '+ policy.Vehicles[0].make + '\n'
      + 'Vehicle Model\t: '+ policy.Vehicles[0].model + '\n'
      + 'Insured\t: '+ insured.firstName + '\n'
      + '===================cut here========================\n',
      dialogTitle: 'ID Card for Policy',
    });
  }
}
