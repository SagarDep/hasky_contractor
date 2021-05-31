import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LoadingController, AlertController, Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";
import { TestingService } from "../services/testing.service";
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';


import Swal from "sweetalert2";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  userData = null;
  lan = "";
  title = "";
  language: any = [];
  //postData = {};
  loading = "";
  FB_APP_ID: number = 1380470452125843;
  loginData = {};
  email = "";
  password = "";
  dts = "";
  passwords = "password";
  valor = 0;
  constructor(
    public loadingController: LoadingController,
    private router: Router,
    public platform: Platform,
    public alertController: AlertController,
    public http: HttpClient,
    private storage: Storage,
    public toastController: ToastController,
    private menu: MenuController,
    private services: TestingService,
    private nav: NavController,
    private googlePlus: GooglePlus,
    private signInWithApple:  SignInWithApple
  ) {

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `E-mail and/or password is incorrect`,
      position: "top",
      duration: 2000
    });
    toast.present();
  }

  async Login() {
    this.services.Login(this.email, this.password).subscribe(
      res => {
        if (res.user.confirmed == "0") {
          this.storage
            .set("token", {
              token: res.access_token,
              user: res.user.id
            })
            .then(() => {
              this.router.navigate(["/code"]);
            });
        } else {
          this.storage
            .set("token", {
              token: res.access_token,
              user: res.user.id
            })
            .then(() => {
              //this.router.navigate(["/user"]);
              this.nav.navigateRoot(["/projects"]);

              this.storage.set("validate", "si");
            });
        }
      },
      err => {
        this.presentToast();
        console.log("E-mail and/or password is incorrect");
      }
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message:
        "Cordova is not available on desktop. Please try this in a real device or in an emulator.",
      buttons: ["OK"]
    });

    await alert.present();
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  changeLanguage() {
    let a = this.lan;
    this.language = a;
    if (a === "es") {
      fetch("../../../assets/language.json")
        .then(res => res.json())
        .then(json => {
          this.language = json.es[0].login[0];
          //this.message = json.es[0].message[0];
        });
      this.storage.set("language", "es").then(res => {
        this.title = "Español";
        location.reload();
      });
    }
    if (a === "en") {
      fetch("../../../assets/language.json")
        .then(res => res.json())
        .then(json => {
          this.language = json.en[0].login[0];

          // this.message = json.en[0].message[0];
        });
      this.storage.set("language", "en").then(res => {
        this.title = "English";
        location.reload();
      });
    }
  }
  signup() {
    this.router.navigate(["/signup"]);
  }
  passwordf() {
    this.router.navigate(["/password"]);
  }

  ionViewWillEnter() {
    this.menu.enable(false, "first");
    this.storage.keys().then(
      data => {
        if (data.length == 0) {
          this.storage.set("language", "en").then(res => {
            fetch("../../../assets/language.json")
              .then(res => res.json())
              .then(json => {
                this.language = json.en[0].login[0];
                location.reload();
              });
          });
        } else {
          this.storage.get("language").then(res => {
            if (res == "en") {
              let la = "json.en[0];";
              fetch("../../../assets/language.json")
                .then(res => res.json())
                .then(json => {
                  this.language = json.en[0].login[0];
                });
            }
            if (res == "es") {
              fetch("../../../assets/language.json")
                .then(res => res.json())
                .then(json => {
                  this.language = json.es[0].login[0];
                });
            }
          });
        }
      },
      error => {
        alert("no");
      }
    );
    this.storage.get("validate").then(
      res => {
        if (res == null) {
          this.router.navigate(["/home"]);
        } else {
          /*
        if(res == "no"){
          this.router.navigate(["/code"]);
        }
        if(res == "co"){
          this.router.navigate(["/add-company"]);
        } */
          if (res == "si") this.nav.navigateRoot(["/projects"]);
        }
      },
      error => {
        this.router.navigate(["/home"]);
      }
    );
  }
  test() {
    //this.router.navigate(["/test"]);
    this.router.navigate(["/user"]);
  }
  async presentToastError() {
    const toast = await this.toastController.create({
      position: "top",
      message: "The email has already been taken.",
      duration: 2000
    });
    toast.present();
  }
  async pros() {
    const toast = await this.toastController.create({
      position: "top",
      message: "in process",
      duration: 2000
    });
    toast.present();
  }
  viewPassword(){
    if(this.valor == 0){
      this.passwords = "text";
      this.valor = 1;
    }else{
      this.passwords = "password";
      this.valor = 0;
    }
  }


    async doGoogleLogin(){
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      this.presentLoading(loading);

      this.googlePlus.login({
        'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '739982306161-u6pov942oft8a7qm4eeo4uht6ro7tiis.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user =>{
        loading.dismiss();

        this.services.loginSocial(user.email).subscribe(res=>{
          if(res['user'].confirmed == '0'){
            this.storage
            .set("token", {
              token: res['access_token'],
              user: res['user'].id
            })
            .then(() => {
              this.router.navigate(["/code"]);
            });
          }
          if(res['user'].type == 'worker'){

          }
          else{
            // console.log(res['access_token']);
            // console.log(res['user'].id);
            // console.log(user.givenName); //name
            // console.log(user.familyName); //surname
            // console.log(user.email);
            this.storage
            .set("token", {
              token: res['access_token'],
              user: res['user'].id
            })
            .then(() => {
              loading.dismiss();
              //this.router.navigate(["/user"]);
              this.nav.navigateRoot(["/projects"]);

              this.storage.set("validate", "si");
            });
          }
        }, err =>{
          let a = this.generatepassword();
          let b = '123456789';
          //this.nav.navigateForward(["/signup"]);
          this.services.singup(
            user.givenName,
            user.familyName,
            user.email,
            a,
            a,
            b
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
            console.log("entro a un error");
            this.presentToastError();
          });

          //console.log('la pass es' , a);
        });
      }, err => {
        console.log(err);
        console.log('imprime esto');
        loading.dismiss();
      });


    }

    generatepassword(): string {
      var generatePassword = (
        length = 20,
        wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
      ) => Array(length)
            .fill('')
            .map(() => wishlist[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * wishlist.length)])
            .join('');
            console.log(generatePassword());
      return generatePassword();
    }
    async doGoogleApple(){
   
    
      this.signInWithApple.signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
        ]
      })
      .then((res: AppleSignInResponse) => {
        
        // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
        //alert('Send token to apple for verification: ' + res.fullName + res.email);
  
        this.services.loginSocial(res.email).subscribe(res=>{
          if(res['user'].confirmed == '0'){
            this.storage
            .set("token", {
              token: res['access_token'],
              user: res['user'].id
            })
            .then(() => {
              this.router.navigate(["/code"]);
            });
          }
          if(res['user'].type == 'worker'){
          
          }
          else{
            this.storage
            .set("token", {
              token: res['access_token'],
              user: res['user'].id
            })
            .then(() => {
            
              //this.router.navigate(["/user"]);
              this.nav.navigateRoot(["/projects"]);
            
              this.storage.set("validate", "si");
            });
          }
        }, err =>{
          let a = this.generatepassword();
          let b = '123456789';
          //this.nav.navigateForward(["/signup"]);
          this.services.singup(
            res.fullName.givenName,
            res.fullName.middleName, 
            res.email,
            a,
            a,
            b
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
         
         //console.log('la pass es' , a);
        });
      }, err =>{
        console.log(err)
        console.log('imprime esto')
       
      });
  
       // console.log(res);
      } 
}
 
  

