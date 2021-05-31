import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import {TestingService} from "../../services/testing.service";
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import Swal from "sweetalert2";

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {
  language: any = [];
  code = "";
  isenabled = false;
  token: string;
  userId: number;
  constructor(private storage: Storage, private menu: MenuController, private router: Router, private services: TestingService, public alertController: AlertController) { }
 
  ngOnInit() {
    this.isenabled = false;
  
    this.menu.enable(false, "first");
    this.storage.get("language").then(res => { 
      if (res === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].confirmation[0];
            console.log(this.language);
          });
      }
      if (res === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.en[0].confirmation[0];
            // this.error_messages = json.en[0].error_messages[0];
            //console.log(json.en[0].error_messages[0]);
          });
      }
      this.storage.get("token").then(res =>{
        this.token = res.token;
        this.userId = res.user;
      }) 
    });

  }
  onVerifyChange(e) {
    if (this.code.length != 0) {
        this.isenabled = true;
    }
    else { 
        this.isenabled = false;
    }
  }
  checkIsEnabled() { 
    return !this.isenabled;
  }

  verifyCode(){
    this.storage.get("token").then(data =>{
        this.services.verifyCode(data.token, this.code).subscribe(re =>{
          //console.log(data.access_token)
          if(re.type == "success"){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
    
            })
            Toast.fire({
              type: 'success',
              title: 'account verified'
            }).then((resu) =>{
              if(resu.dismiss === Swal.DismissReason.timer){
                  //this.router.navigate(["/add-company"]);
                  this.storage.set("validate", "si");
                  this.presentAlert();
              }
            })
          }
        }, error =>{
          console.log(error) 
        })
      })
    
  }

  resenCode(){
    this.services.resenCode(this.token).subscribe(res =>{
      if(res.type == "success"){
        const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
    
       })
       Toast.fire({
              type: 'success',
              title: 'code sent successfully'
            }).then((resu) =>{
              if(resu.dismiss === Swal.DismissReason.timer){
              }
            })


      }
       
      //console.log("code sent successfully");
    })
  }
  
  async presentAlert() {
    let data = {
        name: "",
        description: "",
        user_id: this.userId
    }
    const alert = await this.alertController.create({
      header: '',
      message: 'Do you want to add a company?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigate(["/projects"]);
            //this.services.addCompany( data, this.token).subscribe();
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(["/add-company"]);
          }
        }
      ]
    });

    await alert.present();
  }

}
