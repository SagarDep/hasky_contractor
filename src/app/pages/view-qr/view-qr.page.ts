import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { TestingService } from '../../services/testing.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-view-qr',
  templateUrl: './view-qr.page.html',
  styleUrls: ['./view-qr.page.scss'],
})
export class ViewQrPage  {
  op = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  params = "";
  Qy: any = [];
  projectId: string;
  requestId: string;
  userId: string;
  date: string;
  time: string;
  token: string;
  idUser: string;
  mesajetrue = "Checking saved successfully";
  mesajefalse = "error";
  language: any = [];

  constructor(private barcodeScanner: BarcodeScanner, private route: Router, private services: TestingService, private storage: Storage, public toastController: ToastController) { }
  
  ngOnInit() {
    this.storage.get("language").then(data => {
      // console.log("init");
  
       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].view_qr[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].view_qr[0];
             console.log(this.language);
           });
       }
     });

  } 
  async ionViewWillEnter(){
    await this.gettoken();
  }
    openQr(){
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
          this.params = barcodeData.text;
          //console.log(this.params)
          this.Qy = barcodeData.text.split(" ");
          this.projectId = this.Qy[0];
          this.requestId = this.Qy[1];
          this.userId = this.Qy[2];
          this.date = this.Qy[3];
          this.time = this.Qy[4];
          console.log( this.time);
          let data = {
            user_id: this.userId.substring(8),
            project_id: this.projectId.substring(10),
            request_id: this.requestId.substring(10),
            date: this.date.substring(5),
            time: this.time.substring(5)
          }
          //console.log(data);
          
          this.services.chekIn(data, this.token).subscribe(res =>{
            
            if(res.type == "success"){
              this.presentToast(this.mesajetrue);
            }else{
              this.presentToast(this.mesajefalse);
            }
          }, error =>{
            this.presentToast(this.mesajefalse);
          }) 

          
       }).catch(err => {
           console.log('Error', err);
       });
       
    }
    async gettoken(){
     
      await this.storage.get("token").then(res =>{
        this.token =  res.token;
        this.idUser = res.user;
        console.log("token es", res);
        
      });
    }
    async presentToast(mensaje) {
      const toast = await this.toastController.create({
        message: `${mensaje}`,
        duration: 3000
      });
      toast.present();
    }
  

}
