import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {TestingService} from '../../services/testing.service';
import {Storage} from '@ionic/storage';
import {Data} from '../../interfaces/user';

//import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {NavigationExtras, Router} from "@angular/router";
import {ChatUserType} from "../../interfaces/chat-user";

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-info-worker',
  templateUrl: './info-worker.page.html',
  styleUrls: ['./info-worker.page.scss'],
})

export class InfoWorkerPage implements OnInit {
  @Input() worker: number;
  @Input() idRequest:number;
  @Input() accepted: number;
  idUser= "";
  token = "";
  wor: Data[] = [];
  trades: any = [];
  days: any = [];
  tools: any = [];
  language: any = [];
  //fileTransfer: FileTransferObject;
  cv = true;

  selectedUser = {} as ChatUserType;
  currentUser = {} as ChatUserType;
  hrsTotal: number;

  hoursT: any = [];

  hrs: number;

  constructor(public modalController: ModalController,
              private router: Router, private services:
                TestingService, public loadingController: LoadingController, private storage: Storage,
             
              private DocumentViewer: DocumentViewer,
              private FileOpener: FileOpener,
              private fileOpener: FileOpener,
              //private transfer: FileTransfer,
              ) {
             
  }

  async ngOnInit() {
    await this.storage.get("token").then(res => {
      this.idUser = res.user;
      this.token = res.token;
    });
    //console.log(this.worker);
    this.getUser();
    console.log("que es eto?", this.accepted);

    this.storage.get("language").then(data => {
      // console.log("init");

       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].info_worker[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].info_worker[0];
             console.log(this.language);
           });
       }
     });
  }

  close(){
    this.modalController.dismiss();
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async getUser(){
    this.wor = [];
    this.trades = [];
    this.days = [];
    this.tools = [];
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.getUser(this.token, this.worker).subscribe(res =>{
        this.wor.push(res.data);
        this.trades = res.data.trades;
        this.tools =  res.data.tools;
        this.separator(res.data.working_days);
        console.log(this.trades);
        loading.dismiss();
        if(res.data.cv == null){
          this.cv = false;
        }
    })
    this.getHrs(this.worker, this.idRequest);
  }
  separator(string) {
    //elimina el ultimo |
    let res = string.split("|");
    res.length = res.length - 1;
    this.days.push(...res);
    console.log(this.days);
  }
  async accept(){
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.acceptWorker(this.worker, this.idRequest, this.token).subscribe(res =>{
      console.log(res);
      if(res.type = "success"){
        loading.dismiss();
        this.modalController.dismiss();
      }else{
        loading.dismiss();
      }
    }, erro =>{
      loading.dismiss();
    })
  }
  async cancel(){
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.cancelWorker(this.worker, this.idRequest, this.token).subscribe(res =>{
      console.log(res);
      if(res.type = "success"){
        loading.dismiss();
        this.modalController.dismiss();
      }else{
        loading.dismiss();
      }
    }, erro =>{
      loading.dismiss();
    })
  }
  download(url: string, title: string) {
    // let urs = `https://api.haskyconnections.com/uploads/${url}`;
    // this.fileTransfer = this.transfer.create();
    // this.fileTransfer
    //   .download(urs, this.file.dataDirectory + title + ".pdf")
    //   .then(entry => {
    //     console.log("download complete: " + entry.toURL());
    //     this.fileOpener
    //       .open(entry.toURL(), "application/pdf")
    //       .then(() => console.log("File is opened"))
    //       .catch(e => console.log("Error opening file", e));
    //   });
  }
  pruebadownload(URL){
    //let urs = `https://api.haskyconnections.com/uploads/${url}`;
    const pdfUrl = `https://api.haskyconnections.com/uploads/${URL}`;
    const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);

  }

  async openChat(worker) {
    const loading = await this.loadingController.create({
      message: 'Opening Chat'
    });
    this.presentLoading(loading);

    this.storage.get("token").then(res =>{
      console.log(res);
      this.token =  res.token;
      let id = res.user;
      this.services.getUser(res.token, res.user).subscribe(res => {
        this.currentUser.uid = `${res.data.id}`;
        this.currentUser.profileImage = `https://api.haskyconnections.com/uploads/${res.data.profile_image}`;
        this.currentUser.name = `${res.data.first_name} ${res.data.last_name}`;

        this.selectedUser.uid = worker.id;
        this.selectedUser.name = `${worker.first_name} ${worker.last_name}`;
        this.selectedUser.profileImage = `https://api.haskyconnections.com/uploads/${worker.profile_image}`;

        const navigationExtras: NavigationExtras = {
          queryParams: {
            selectedUser: JSON.stringify(this.selectedUser),
            currentUser: JSON.stringify(this.currentUser)
          }
        };
        loading.dismiss();
        this.close();

        this.router.navigate(["/chat"], navigationExtras);
      }, erro=>{
        loading.dismiss();
      })
    })
  }
  getHrs(idUser, idRequest) { 
    this.services.getHrsWorker(idUser, idRequest, this.token).subscribe(res=>{
      this.hrsTotal = res["data"]["summary"].length;
      this.hoursT = res["data"]["summary"];
      this.hrs = res["data"]["hrs"];
      //console.log(this.worker, this.idRequest)
    });

   
   
  }


}
