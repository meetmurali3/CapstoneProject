import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-folder',
  templateUrl: './admin.page.html',
  styleUrls: ['../folder/folder.page.scss'],
})
export class AdminPage implements OnInit {
  users = [];
  uwUsers : any = [];
  uwAssists : any = [];
  role = '';
  errorMessage : string;
  //variables such a title and items
  title = "Administration - Users";
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public alertCtrl: AlertController,
              public dataService: DataServiceService) { 
    this.getUsers();
    this.getUnderwriterUsers();
    this.getUWAsstUsers();

    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getUsers();
      this.getUnderwriterUsers();
      this.getUWAsstUsers();
    });
    
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewDidLoad(){
    console.log("First load");
    this.getUsers();
    this.getUnderwriterUsers();
    this.getUWAsstUsers();
  }

   /***
   * This function returns the list of items
   * This calls dataservice getItems()
   */
  getUsers () {
    return this.dataService.getUsers().subscribe(
                          a => this.users = a,
                          error => this.errorMessage = <any>error);
  }

  getUnderwriterUsers () {
    return this.dataService.getUWs().subscribe(
                          b => this.uwUsers = b,
                          error => this.errorMessage = <any>error);
  }

  getUWAsstUsers () {
    return this.dataService.getUWAssits().subscribe(
                          items => this.uwAssists = items,
                          error => this.errorMessage = <any>error);
  }



  createUser (user) {
    return this.dataService.addUser(user);
  }

}
