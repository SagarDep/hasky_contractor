import {Component} from '@angular/core';
import {TestingService} from '../../../services/testing.service';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {InfoWorkerPage} from '../../../modal/info-worker/info-worker.page';
import {Location} from "@angular/common";
import {Datum, User} from '../../../interfaces/getWorkersDetails';
import {ChatUserType} from "../../../interfaces/chat-user";
import {FirebaseService} from "../../../services/firebase.service";


@Component({
  selector: 'app-workers-details',
  templateUrl: './workers-details.page.html',
  styleUrls: ['./workers-details.page.scss'],
})
export class WorkersDetailsPage {

  constructor(private services: TestingService,
              private router: Router,
              private activate: ActivatedRoute,
              private storage: Storage,
              private location: Location,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public modalController: ModalController,
              private firebaseService: FirebaseService) {

  }
  edit = false;
  info = true;
  idRequest: string;
  idUser:number;
  token: string;

  experience: string;
  quantity_workers: string;
  start_date = "";
  end_date = "";
  weekdays = "";
  start_time = "";
  end_time = "";
  task: string;
  cost = "";
  days: any = [];
  workers: any = [];
  wor: Datum[] = [];
  va = 0 ;
  language: any = [];
  disable = false;

  selectedUser = {} as ChatUserType;
  currentUser = {} as ChatUserType;

  viewFlat: string;

  async ionViewWillEnter() {
    this.idRequest = this.activate.snapshot.paramMap.get('id');
    await this.storage.get("token").then(res =>{
      this.idUser = res.user;
      this.token = res.token;
     });
    await this.getRequestWorker();
    await  this.getWorkers();


  }
ngOnInit() {
    this.storage.get("language").then(data => {
      // console.log("init");

       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].workers_details[0];
             //console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].workers_details[0];
             //console.log(this.language);
           });
       }
     });
  }


  async getRequestWorker(){
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.getRequesWorker(this.idRequest, this.token).subscribe(res =>{
      console.log(res)
      this.experience = `${res.data.experience} $${res.data.cost}/hr`;
      this.quantity_workers = res.data.quantity_workers;
      this.start_date = res.data.start_date;
      this.end_date = res.data.end_date;
      this.weekdays = res.data.weekdays;
      this.separator(res.data.weekdays);
      this.start_time = res.data.start_time;
      this.end_time = res.data.end_time;
      this.task = res.data.task;
      this.cost = res.data.cost;
     // this.wor.push(...res.data.users);
      //console.log("trabajador aceptado", res.data.status);
      if(res.data.status == "pending"){
        this.disable = true; 
        
      }
      if(res.data.status == "active"){
        this.viewFlat = res.data.status
      }
      loading.dismiss();
    }, error =>{
      loading.dismiss();
    });
  }


  async presentLoading(loading) {
    return await loading.present();
  }
  separator(string) {
    //elimina el ultimo |
    let res = string.split("|");
    res.length = res.length - 1;
    this.days.push(...res);
   // console.log(this.days);
  }


  async openWorker(id, accep){
    const modal = await this.modalController.create({
      component: InfoWorkerPage,
      componentProps: {
        worker: id,
        idRequest: this.idRequest,
        accepted: accep
      }
    });
     await modal.present();
    modal.onDidDismiss().then((res: any) => {
      this.days = [];
      this.wor = [];
      this.getRequestWorker();
      this.getWorkers();
    });
  }
  async deleteRequet(){
    const loading = await this.loadingController.create({
      message: ""
    });

    const alert = await this.alertController.create({
      header: '',
      message: 'Are you sure you want to delete this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
            //this.router.navigate(["/projects"]);
            //this.services.addCompany( data, this.token).subscribe();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.presentLoading(loading);
            this.services.deleteRequestWorket(this.idRequest, this.token).subscribe(res =>{
              if(res.type == "success"){
                loading.dismiss();
                this.location.back();
              }else{
                loading.dismiss()
              }
            }, erro  =>{
                loading.dismiss();
                //console.log(erro);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  getWorkers(){
    this.wor = [];
    this.services.getWorkerDetails(this.idRequest, this.token).subscribe(res =>{
      this.wor.push(... res.data);
     // console.log(res)
    })
  }
  stripe() {
    this.router.navigate(["/stripe", this.idRequest]);
  }

  async openChat(worker: User) {
    const loading = await this.loadingController.create({
      message: 'Opening Chat'
    });
    this.presentLoading(loading);

    this.storage.get("token").then(res =>{
      //console.log(res);
      this.token =  res.token;
      let id = res.user;
      this.services.getUser(res.token, res.user).subscribe(res => {
        this.currentUser.uid = `${res.data.id}`;
        this.currentUser.profileImage = `https://api.haskyconnections.com/uploads/${res.data.profile_image}`;
        this.currentUser.name = `${res.data.first_name} ${res.data.last_name}`;

        this.selectedUser.uid = `${worker.id}`;
        this.selectedUser.name = `${worker.first_name} ${worker.last_name}`;
        this.selectedUser.profileImage = `https://api.haskyconnections.com/uploads/${worker.profile_image}`;


        const navigationExtras: NavigationExtras = {
          queryParams: {
            selectedUser: JSON.stringify(this.selectedUser),
            currentUser: JSON.stringify(this.currentUser)
          }
        };
        loading.dismiss();

        this.router.navigate(["/chat"], navigationExtras);
      }, erro=>{
        loading.dismiss();
      })
    })
  }
  

}
