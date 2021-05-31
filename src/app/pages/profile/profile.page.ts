import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from "@ionic/angular";
import { TestingService } from "../../services/testing.service";
import { Storage } from "@ionic/storage";
import { LoadingController } from '@ionic/angular';
import { User, Data } from '../../interfaces/user'; 
import {Router} from "@angular/router";
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController } from '@ionic/angular';

declare var require: any
const FileSaver = require('file-saver');

 


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //fileTransfer: FileTransferObject;
  num = "";
  token = "";
  id = "";
  name = "";
  //user: User;
  //use: Data[];
  //
  profile: string;
  companyImage: string;
  user: any = [];
  company: any = [];
  document: any = [];
  firts: string;
  last: string;
  email: string;
  phone: string;
  names: string;
  description: string;
  urlImage: string;
  idC: number;
  rating: string;
  va = 0;
  addPayment: string;
  constructor(
    private menu: MenuController, 
    private services: TestingService, 
    private storage: Storage, 
    public loadingController: LoadingController, 
    private router: Router,
    //private FileTransfer: FileTransfer,
    private DocumentViewer: DocumentViewer,
    private FileOpener: FileOpener,
    private platform: Platform,
    private fileOpener: FileOpener,
    //private transfer: FileTransfer,
    public alertController: AlertController
    ) {
      
     }
  language: any = [];
  ngOnInit() {
    this.storage.get("language").then(data => {
      // console.log("init");
  
       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].profile[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].profile[0];
             console.log(this.language);
           });
       }
     });
  }
  openMenu() {
    if (this.num == "") {
      this.menu.enable(true, "first");
      this.menu.open("first");
      this.num = "1";
    }
    if (this.num == "1") {
      this.menu.enable(true, "first");
      this.menu.close("first");
      this.num = "";
    }
  }

   async gestorage(){
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    
    this.storage.get("token").then(res =>{
      this.profile = "";
      console.log(res);
      this.token =  res.token;
      this.id = res.user;
      this.services.getUser(res.token, res.user).subscribe(res => {
        loading.dismiss();
        //this.user = res.data;
        //this.company = res.data
        this.profile = res.data.profile_image;
        this.firts = res.data.first_name;
        this.last = res.data.last_name;
        this.email = res.data.email;
        this.phone = res.data.phone_number;
        this.names = res.data.company.name;
        this.description = res.data.company.description;
        this.idC = res.data.company.id;
        this.urlImage = res.data.company.image;
        this.document =  res.data.documents;
        this.addPayment = res.data.payment_add;
        //console.log( res.data.documents);
        if(res.data.rating == null){
          this.va = 0;
        }else{
          this.va = res.data.rating;
        }
        this.companyImage =  res.data.company.image;
        //console.log(res.data.company);
        //this.user = res.data;
        //loading.dismiss();
      }, erro=>{
        loading.dismiss();
      })
    })
    //console.log(this.user);
  }

  async presentLoading(loading) {
		return await loading.present();
  }
  hola(){
   // console.log(this.user);
  }

  editUser(){
    this.router.navigate(["edit-user"]);
    
   //console.log(this.names, this.description, this.idC, this.urlImage);
  }
  documents(){
    this.router.navigate(["documents"]);
  }
  editCompany(){
    this.router.navigate(["edit-company"]);
    this.storage.set("company", {name: this.names, description: this.description, id: this.idC, url: this.urlImage});
  }

  ionViewWillEnter(){
    this.gestorage();
  }
  saveDocument(){

  }
  // DownloadInpreview(urls){
  //   let urs = `https://api.haskyconnections.com/uploads/${urls}`; 
  //   let path = null;
  //   if(this.platform.is('ios')){
  //     path = this.file.documentsDirectory;
  //   }else{
  //     path = this.file.dataDirectory;
  //   }

  //   const transfer = this.FileTransfer.create();
  //   transfer.download(`${urs}`, path + 'myFile.pdf').then( entry =>{
  //     let url = entry.toURL();
  //     this.DocumentViewer.viewDocument(url, 'application/pdf', {});
  //   }, (error) =>{
  //     console.log(error);
  //   })
   
  // }
  selectedFile = null;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    if(this.selectedFile != null){
      this.uploadPicture();
    }
  }
  async uploadPicture(){
    if(this.selectedFile == null){
      
    }else{
      const loading = await this.loadingController.create({
        message: ''
      });
      this.presentLoading(loading);
    let data = {
      user_id: this.id,
      file: this.selectedFile
    }
    this.services.uploadPicturePerfil(data, this.token).subscribe( res =>{
      if(res.type == "success"){
        this.gestorage();
        loading.dismiss();
      }
      })
    }
  }
  // download(url: string, title: string) {
  //   let urs = `https://api.haskyconnections.com/uploads/${url}`;
  //   console.log(urs);
  //   this.fileTransfer = this.transfer.create();
  //   if(this.platform.is('ios')){
  //     this.fileTransfer
  //     .download(urs, this.file.documentsDirectory + title + ".pdf")
  //     .then(entry => {
  //       console.log("download complete: " + entry.toURL());
  //       this.fileOpener
  //         .open(entry.toURL(), "application/pdf")
  //         .then(() => console.log("esta en ios"))
  //         .catch(e => console.log("Error opening file", e));
  //     });
  //   }else{
  //     this.fileTransfer
  //     .download(urs, this.file.dataDirectory + title + ".pdfs")
  //     .then(entry => {
  //       console.log("download complete: " + entry.toURL());
  //       this.fileOpener
  //         .open(entry.toURL(), "application/pdf")
  //         .then(() => console.log("File is opened"))
  //         .catch(e => console.log("Error opening file", e));
  //     });
  //   }
  // }

  pruebadownload(URL){
    //let urs = `https://api.haskyconnections.com/uploads/${url}`;
    const pdfUrl = `https://api.haskyconnections.com/uploads/${URL}`;
    const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
   
  }
  completeProfile(){
    this.router.navigate(['complete-profile']);
  }
  async deleteDocument(id){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `${this.language.delete}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.services.deleteDocuments(this.token, id ).subscribe(res =>{
              if(res['type'] == "success"){
                this.gestorage();
              }
              
            });
           
          }
        }
      ]
    });

    await alert.present();
   
  }


} 
