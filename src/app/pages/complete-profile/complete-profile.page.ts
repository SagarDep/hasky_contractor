import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { TestingService } from '../../services/testing.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { ToastController } from '@ionic/angular';

// import {
//   FileTransfer,
//   FileTransferObject
// } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';


@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {
  singup: FormGroup;
  step1= false;
  step2 = true;
  numberValidate: string;
  // fileTransfer: FileTransferObject;
  constructor(private iab: InAppBrowser, private stoarge: Storage, private services: TestingService,  public formBuilder: FormBuilder,  private fileOpener: FileOpener,
    // private transfer: FileTransfer,
   public toastController: ToastController, private route: Router) {

    this.singup = this.formBuilder.group({
      last_company: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ])
      ),
      manager_name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ])
      ),
      manager_position: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ])
      ),
      manager_phone: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(12),
        ])
      ),
      position_finish: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(36),
        ])
      ),
    });
   }
  token:string;
  id:string;
 
  require = "";
  async ngOnInit() {
    await this.getToken();
  }

 async addPayment(){
  
    const browser = this.iab.create(`https://admin.haskyconnections.com/payment-metods?token=${this.token}`);
    browser.on('exit').subscribe(event => {
      console.log('close');
     
       this.validateAddPayment();
    })
  }

  async getToken(){
    await this.stoarge.get('token').then(res => {
      this.token = res.token;
      this.id = res.user;
    })
  }

  addReferences(){
   let data = {
    user_id: this.id,
    last_company: this.singup.value.last_company,
    manager_name: this.singup.value.manager_name,
    manager_position: this.singup.value.manager_position,
    manager_phone: this.singup.value.manager_phone,
    position_finish: this.singup.value.position_finish
   }
   
    this.services.references(data, this.token).subscribe(res => {
      if(res.type == "success"){
        this.step1 = true;
        this.step2 = false;
      }
    })

  }
  
  selectedFile = null;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    if(this.selectedFile != null){
      this.saveDocument()
    }
  }


  async saveDocument(){
  
    let data = {
      user_id: this.id,
      file: this.selectedFile
    }
    this.services.addCv(data, this.token).subscribe(res =>{
      console.log(res);
      if(res.type == "success"){
       this.presentToast();
      }
    })
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Document saved',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  async presentToasts() {
    const toast = await this.toastController.create({
      message: 'payment added',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  async validateAddPayment(){
    let a;
    await this.services.getUser(this.token, this.id).subscribe(res => {
      console.log(res.data.payment_add);
      if(res.data.payment_add == '1'){
        this.presentToasts().then(()=>{
          this.route.navigate(['user/user']);
        })
      }
    })
    
  }
  back(){
    this.route.navigate(['profile']);
  }

}
