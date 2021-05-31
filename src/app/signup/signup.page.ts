import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";

import { TestingService } from "../services/testing.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage {
  language: any = [];
  singup: FormGroup;
  error_messages: any = [];
  password = "password";
  valor = 0;
  password2 = "password";
  valor2 = 0;
  constructor( 
    private storage: Storage,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private menu: MenuController,
    private services: TestingService,
    private router: Router
  ) {
    this.singup = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(35),
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      firstname: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ])
      ),
      lastname: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(40)
        ])
      ),
      phone: new FormControl(
        "",
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35)
        ])
      ),
      passwordR: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35)
        ])
      )
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false, "first");
    this.storage.get("language").then(res => {
      if (res === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].signup[0];
            console.log(this.language);
          });
      }
      if (res === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.en[0].signup[0];
            this.error_messages = json.en[0].error_messages[0];
            console.log(json.en[0].error_messages[0]);
          });
      }
    });
  }
  save() { 
    //console.log(this.singup.value.email);
    if (this.singup.value.password != this.singup.value.passwordR) {
      this.presentToast();
    } else {
      console.log(this.singup.value.phone);
      if(this.singup.value.phone == ""){
        this.singup.value.phone = '00000000000'
      }
      this.services.singup(
        this.singup.value.firstname,
        this.singup.value.lastname, 
        this.singup.value.email,
        this.singup.value.password,
        this.singup.value.passwordR,
        this.singup.value.phone
      ).subscribe(res =>{
        this.storage.set("token", {
          token: res.access_token,
          user: res.user.id
        }).then(()=>{
          this.storage.set("validate", "no").then(()=>{
            this.router.navigate(["/code"]);
          })
        })
       
      }, erro =>{
        console.log("entro a un error")
        this.presentToastError();
      });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      position: "top",
      message: "password do not match",
      duration: 2000
    });
    toast.present();
  }
  async presentToastError() {
    const toast = await this.toastController.create({
      position: "top",
      message: "The email has already been taken.",
      duration: 2000
    });
    toast.present();
  }

  click(){
    this.router.navigate(["/code"]);
  }
  viewPassword(){
    if(this.valor == 0){
      this.password = "text";
      this.valor = 1;
    }else{
      this.password = "password";
      this.valor = 0;
    }
  }
  viewPassword2(){
    if(this.valor2 == 0){
      this.password2 = "text";
      this.valor2 = 1;
    }else{
      this.password2 = "password";
      this.valor2 = 0;
    }
  }
}
