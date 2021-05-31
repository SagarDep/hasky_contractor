import { Component, OnInit } from '@angular/core';
import { TestingService } from '../services/testing.service';
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  page1 = true;
  page2 = false;
  constructor(private services: TestingService, private loadingController: LoadingController, private route: Router,private storage: Storage) { }
  email: string;
  emailR: string;
  code: string;
  password: string;
  language: any = [];
  ngOnInit() {
    this.storage.get("language").then(res => {
      if (res === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].password[0];
 
          });
      }
      if (res === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then( json => {
            this.language = json.en[0].password[0];   
          });
      }
    });
  }
  async sendEmail(){
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    this.services.sendEmail(this.email).subscribe(res =>{
      if(res.type == "success"){
        loading.dismiss();
        this.page2 = true;
        this.page1 = false;
      }else  loading.dismiss();
     
    }, error =>{
      loading.dismiss();
    })
  }

  async presentLoading(loading) {
		return await loading.present();
  }

  async changePassword(){
    let data = {
      code: this.code,
      email: this.emailR,
      password: this.password
    }
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    this.services.changePassoword(data).subscribe(res =>{
      loading.dismiss();
      this.route.navigate(["/home"]);
      console.log(res);
    }, err =>{
      loading.dismiss();
    })
  }

}
