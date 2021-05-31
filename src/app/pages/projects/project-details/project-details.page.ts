import { ApplicationRef, Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import { Storage } from "@ionic/storage";
import { Datum } from 'src/app/interfaces/break_times';
import { TestingService } from "../../../services/testing.service"; 
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";
import { LoadingController, IonInput } from "@ionic/angular";
import {catchError} from "rxjs/operators";
import { NotificationServiceService } from '../../../services/notification-service.service';
declare var google;



@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  @ViewChild ('addres', {static: true}) inpu: IonInput;
  map: any; 
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any; 
  constructor(private storage: Storage, private refe: ApplicationRef, private services: TestingService, private router: Router, public loadingController: LoadingController, private activateRouter: ActivatedRoute, public zone: NgZone,
    public geolocation: Geolocation, private pushNotification: NotificationServiceService) {
      this.geocoder = new google.maps.Geocoder;
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = {
        input: ''
      };
      this.autocompleteItems = [];
      this.markers = [];

     }
  name: string;
  names: string;
  address: string;
  supervisor_name: string;
  supervisor_phone: string;
  decription: string;
  break: string;
  paid: string;
  overtime: string;
  idBrak: number;
  idPaid: number;
  idProject: number;
  projectId= "";
  language: any = [];
  project = {};
  requestWorker: any = [];
  idUser:number;
  token: string;
  pageRequest = false;
  pageRequest2 = true;
  read = false;
  done = true;
  pending = false;
  edit = false;
  info = true;
  idTrade= '';
  //breakTimes: Datum[] = [];
  Times: any[] = [];
  hola = "";
  satatus = "";
  nameTrade= "";
  ngOnInit() {
    this.storage.get("language").then(data => {
      // console.log("init");
  
       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].project_details[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].project_details[0];
             console.log(this.language);
           });
       }
     });

  } 

 async ionViewWillEnter(){
   this.projectId = this.activateRouter.snapshot.paramMap.get('id');
   await this.storage.get("token").then(res =>{
    this.idUser = res.user;
    this.token = res.token;
   });
   await this.getProject();
   await this.getTimes();

   
   //this.getProject()
 }
  

  viewEdit(){
    this.edit = true;
    this.info = false;
  }
  closeEdit(){
    this.edit = false;
    this.info = true;
  }
  async save(){
    if(this.names == "" || this.address == "" || this.supervisor_name == "" || this.supervisor_phone == "" || this.decription == ""){

    }else{
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
      let newData = {
      name: this.names,
      address: this.address,
      supervisor_name: this.supervisor_name,
      supervisor_phone: this.supervisor_phone,
      description: this.decription,
      break_time: this.idBrak,
      paid_break_time: this.idPaid,
      overtime: this.overtime
    }
    
    this.services.updateProject(newData, this.token, this.idUser, this.projectId).subscribe(res =>{
      if(res.type == "success"){
        loading.dismiss();
        this.router.navigate(["/projects"]);
      }
      
    }, erro =>{

    }) 
  }
   //console.log(this.idProject)
  
  }

  async deleteProject(){
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.deleteProjects(this.token, this.projectId).subscribe(res =>{
      if(res.type == "success"){
          loading.dismiss();
          this.router.navigate(["/projects"]);
      }
    }, erro =>{
      loading.dismiss()
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  async activateProject(){
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.acivateProjects(this.token, this.projectId).subscribe(res =>{
      if(res.type == "success"){
          loading.dismiss();
          this.router.navigate(["/projects"]);
      }
    }, erro =>{
      loading.dismiss();
    })
  }
  async doneProject(){
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.doneProjects(this.token, this.projectId).subscribe(res =>{
      if(res.type == "success"){
          loading.dismiss();
          this.router.navigate(["/projects"]);
      }
    }, erro =>{
      loading.dismiss();
    })
  }

  stripe(idRequest){
    this.router.navigate(["/stripe", idRequest]);
  }

  async getProject(){ 
    const loading = await this.loadingController.create({
      message: ""
    });
    this.presentLoading(loading);
    this.services.getProject(this.projectId, this.token).subscribe( res =>{
      console.log(res);
      this.names = res.data.name;
      this.address = res.data.address; 
      this.supervisor_name =  res.data.supervisor_name;
      this.supervisor_phone = res.data.supervisor_phone;
      this.decription = res.data.description;
      this.break = res.data.break_time.description
      this.paid = res.data.paid_break_time.description; 
      //console.log(res.data.request_worker);
      if(res.data.request_worker.length != 0){
        this.pageRequest = true;
        this.pageRequest2 = false;
        this.edit = true;
        this.info = true;
        this.requestWorker =  res.data.request_worker;
        this.satatus =  res.data.status;
      }
      //console.log(res)
      if(res.data.status == 'done'){
          this.done = false;
          console.log(this.done)
         // this.pending =true;
      }
      if(res.data.status == 'pending'){
        this.pending = true;
      }
      loading.dismiss()
    })
  }
  getTimes(){
    this.services.getBreakTimes(this.token).subscribe( res =>{
      this.Times = res.data;
      //this.breakTimes.push(...res.data);
     // console.log(this.breakTimes);
    })
  }
  stri = "";
  updateSearchResults(a){
    if(a.detail.data == null){
      this.stri = this.stri.substring(0, this.stri.length - 1);
       // console.log(this.stri);        
     }else{
      this.stri = this.stri + a.detail.data;
     // console.log(this.stri);
     }
    if ( this.stri.length == 0 ) {
      this.autocompleteItems = [];
     // console.log(a);
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.stri },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
    this.address = undefined;
  }
  selectSearchResult(item){
    
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        /* let position = {
             lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
        };*/
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
       
        console.log(item.description);
        this.address = item.description;
        this.inpu.value = item.description;
       
        //this.latlng = new  google.maps.LatLng(results[0].geometry.viewport.ka.h, results[0].geometry.viewport.pa.h);  

      }
      
    })
  }
  editWorkers(id){
    this.router.navigate(['/workers-details', id]);
  }

  //const resultado = res.data.find( fruta => fruta.id === 16 );
  //console.log(' el resultado es ' + resultado.name);

  
}
