import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users = [];
  role = '';
  errorMessage : string;
  //variables such a title and items
  title = "Administration - Users";
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public alertCtrl: AlertController,
              public dataService: DataServiceService,
              public router: Router) { 
    this.getUsers();

    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getUsers();
    });
    
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewDidLoad(){
    console.log("First load");
    this.getUsers();
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

  createUser (user) {
    return this.dataService.addUser(user);
  }

}
