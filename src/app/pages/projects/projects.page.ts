import {Component, ViewChild} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {TestingService} from "../../services/testing.service";
import {Datum} from "../../interfaces/projects";
import {IonSegment, LoadingController, NavController, ActionSheetController} from '@ionic/angular';
import {NotificationServiceService} from '../../services/notification-service.service';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.page.html",
  styleUrls: ["./projects.page.scss"]
})
export class ProjectsPage {
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  language: any = [];
  button: any = [];
  viewNotification = false;
  idUser: number;
  token: string;
  projec: Datum[] = [];
  proje: any = [];
  requestButton = true;
  ignalId: string;
  statuss = "active";
  data = true;
  constructor(private storage: Storage,
              private router: Router,
              private project: TestingService,
              public loadingController: LoadingController,
              private nav: NavController,
              private firebaseService: FirebaseService,
              private pushNotification: NotificationServiceService, 
              private actionSheetController: ActionSheetController) {
  }

  async ionViewWillEnter() {
    await this.segments();
    await this.pushNotification.configuracionInicial();
    await this.getToken();


    //await this.getProjects(this.statuss)
    this.segment.value = "progress";
    await this.storage.get("language").then(data => {
      // console.log("init");

      if (data === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.en[0].menu[0];
            this.button = json.en[0].button[0];
            //console.log(this.language);
          });
      }
      if (data === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].menu[0];
            this.button = json.es[0].button[0];
            //console.log(this.language);
          });
      }
    });
    await this.storage.get("oneSignal").then(res => {
      this.ignalId = res;
      //console.log("el id es ", res)
    });
    await this.saveOneSignalId(this.ignalId, this.token);
    this.storage.get("ref").then(resp=>{
      console.log(resp)
      if(resp == null){
        this.storage.set("ref", "1");
        location.reload();
      }
    });
  }
  newProject() {
    // this.router.navigate(["/new-project"]);
    this.presentActionSheet();
  }
  requestProject() {
    this.router.navigate(["/request-worker"]);
  }
  datas(id){
   // this.storage.set("projec", data.data);
    //this.router.navigate(["project-details"]);
    this.nav.navigateForward(['/project-details', id]);
  }
   async getProjects(valor) {
     let dat = `${valor}`;
     this.proje = [];
     this.data = true;

     //console.log(res.token)
     await this.project.getProjects(this.token).subscribe(res => {
       //let num = 0;
       this.proje = [];
       console.log(res)
       //this.proje = res.data;
       if (res.data.length != 0) {
         this.requestButton = false;
         //loading.dismiss();
       }
       for(let i = 0; i < res.data.length; i++){
            if(res.data[i].status == `${valor}`){
              this.proje.push({
                name: res.data[i].name,
                address: res.data[i].address,
                id: res.data[i].id
              })
            }
       }
       //this.data = false;

       if(res.data)
       setTimeout(() => {
          this.data = false;
        }, 2000);
          }, error =>{
           this.data =false;
          })

   }
  async presentLoading(loading) {
		return await loading.present();
  }
  async saveOneSignalId(idSignal, token){
    let data = {
      onesignal_id: idSignal,
      id: this.idUser
    }
      this.project.editUserSignal(data, token).subscribe(res =>{
       // console.log(res.type);
      })
  }
 async segmentChanged(event){
    if(event.detail.value == "progress"){
        this.statuss = "active";

      await this.getProjects(this.statuss);
    }else if(event.detail.value == "pending"){
      this.statuss = "pending";

      await this.getProjects(this.statuss);
      this.storage.remove('segment');
      this.viewNotification = false;
    }else if(event.detail.value == "done"){
      // this.statuss = "done";

      await this.getProjects(this.statuss);

    }
  }
 async getToken(){
  await this.storage.get("token").then(res =>{
    this.idUser = res.user;
    this.token = res.token;
  });
 }

  doRefresh(event) {
    if(this.statuss == "active"){
        setTimeout(() => {

          this.statuss = "active";
          this.getProjects("active");
        event.target.complete();
      }, 2000);
    }
    if(this.statuss == "pending"){
      setTimeout(() => {

        this.statuss = "pending";
        this.getProjects("pending");
      event.target.complete();
    }, 2000);
    }
    if(this.statuss == "done"){
      setTimeout(() => {

        this.statuss = "done";
        this.getProjects("done");
      event.target.complete();
    }, 2000);
    }
  }

  async segments(){
    await this.storage.get('segment').then(res =>{
      if(res == null){
        console.log('es null');
      }else{
        this.viewNotification = true;
      }
    })
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Type of project',
      mode: 'ios',
      buttons: [
      {
        text: 'Normal Project',
        handler: () => {
          this.nav.navigateForward(['/new-project', "Normal"]);
         // this.router.navigate(["/new-project"]);
        }
      }, 
      {
        text: 'Express Project',
        handler: () => {
          this.nav.navigateForward(['/new-project', "Express"]);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
