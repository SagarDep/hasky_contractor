import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { LoadingController, NavController } from '@ionic/angular';
import { TestingService } from '../../../services/testing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-worker',
  templateUrl: './request-worker.page.html',
  styleUrls: ['./request-worker.page.scss'],
})
export class RequestWorkerPage implements OnInit {

  constructor(private storage: Storage, private loadingController: LoadingController, private services: TestingService, private route: Router, private nav: NavController) { }
  idUser:number;
  token: string;
  proje: any = [];
  idProject: number;
  language: any = [];
  data = true;
  tipo: string;
  ngOnInit() {
    this.storage.get("language").then(data => {
      // console.log("init");
  
       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => { 
             this.language = json.en[0].request_worker[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].request_worker[0];
             console.log(this.language);
           });
       }
     });
  }

  ionViewWillEnter(){
    this.getProjects()
  }
  async getProjects(){
    this.data = true;
    this.storage.get("token").then(res =>{
      this.idUser = res.user;
      this.token = res.token;
      //console.log(res.token)
      this.services.getProjects(res.token).subscribe( res =>{
        console.log(res.data)
        console.log(res.data[0].typeProject)
        this.data = true;
        this.idProject =  res.data[0].id;
        this.proje = res.data;
        //this.tipo = res.data[0].typeProject
        setTimeout(() => {
        this.data = false;
    }, 2000);
          }, error =>{
            //loading.dismiss()
          })
       });
  }
  async presentLoading(loading) {
		return await loading.present();
  }

  addWorker(id, tipo){
    this.nav.navigateForward(['/add-worker', id, tipo])
  }
  back(){
    this.nav.navigateForward(['/projects']);
  }

}
