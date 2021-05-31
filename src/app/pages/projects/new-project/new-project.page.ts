import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Storage } from "@ionic/storage";
import { TestingService } from "../../../services/testing.service";
import { Datum } from 'src/app/interfaces/break_times';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from "@angular/router";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import { IonSlides, LoadingController, Platform, IonContent, ActionSheetController } from "@ionic/angular";
import { ToastController, IonInput, IonSearchbar } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {
  Validators,
  FormBuilder,
  FormGroup, 
  FormControl
} from "@angular/forms";
declare var google;
export interface page1 {
  name: string,
  number: string,
  address: string;
  description: string;
}
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})


export class NewProjectPage  {
  enable = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild (IonSlides, {static: true}) slides: IonSlides;
  @ViewChild ('addres', {static: true}) input: IonInput;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  subcribe: any;
  hidde ="none";
  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any; 
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  noPage = 1;
  ////////////////////////
  language = {};
  data = {};
  saves = {};
  p1: any = [];
  p2: any =[];
  p3: any = [];
  p4: any = [];
  p5: any = [];
  p31: any = [];
  button: any = [];
  breakTimes: Datum[] = [];
  Times: any[] = [];
  butto ="button button-block button-outline ion-activatable ion-focusable hydrated";
  project:string;
  address: string;
  supervisor: string;
  phone: string;
  description: string;
  break: string;
  paid: string;
  overtimes: string;

  idbreak: number;
  descriptionbreak: string;
  idpaid: number;
  descriptionpaid: string;

  none: string;
  hours: string;
  idUser:number;

  token: string;

  datas = true;
  singup: FormGroup;
  isKeyboardopen=true;
  pop = false;

  tipo: string;

  slideOptsOne = {
    initialSlide: 0
  }

  constructor(
    private storage: Storage,
    private breakTime: TestingService,
    private router: Router,
    public zone: NgZone,
    private keyboard: Keyboard,
    public geolocation: Geolocation,
    public toastController: ToastController,
    private platform: Platform,
    public formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    private activate: ActivatedRoute ) { 
      
      this.geocoder = new google.maps.Geocoder;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];

    this.singup = this.formBuilder.group({
      project: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          
        ])
      ),
      supervisor: new FormControl(
        "",
        Validators.compose([
          Validators.required,
         
        ])
      ),
      phone: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          
        ])
      ),
      description: new FormControl(
        "",
        Validators.compose([
          Validators.required,
         
          
        ])
      )
    });
      this.clear();
      document.addEventListener("backbutton",function(e) {
        console.log("disable back button")
      }, false);
      this.tipo = this.activate.snapshot.paramMap.get('tipo');
     
    }

    ionViewWillEnter() {
      
     
    this.clear();
    this.storage.get("token").then(res =>{
        this.idUser = res.user;
        this.token = res.token;
        //console.log(res.token);
    });
    this.storage.get("language").then(res => {
      if (res === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.p1 = json.es[0].new_project[0].page1;
            this.p2 = json.es[0].new_project[0].page2;
            this.p3 = json.es[0].new_project[0].page3;
            this.p4 = json.es[0].new_project[0].page4;
            this.p5 = json.es[0].new_project[0].end_page;
            this.button = json.es[0].new_project[0].button;
          });
      }
      if (res === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then( json => {
            this.p1 = json.en[0].new_project[0].page1;
            this.p2 = json.en[0].new_project[0].page2;
            this.p3 = json.en[0].new_project[0].page3;
            this.p4 = json.en[0].new_project[0].page4;
            this.p5 = json.en[0].new_project[0].end_page;
            this.button = json.en[0].new_project[0].button;
            this.p31 = json.en[0].new_project[0].page3.button;     
          });
      }
    });
    this.breakTime.getBreakTimes(this.token).subscribe( res =>{ 
     // this.breakTimes.push(...res.data);
     this.Times = res.data;
      console.log(this.breakTimes);
    })
    this.slides.lockSwipes(true);
  }

  check(e, description){
    for(let i = 0; i < this.Times.length; i ++){
      if(this.Times[i].id == e){
        //console.log(this.breakTimes[i].id);
        document.getElementById(`${this.Times[i].id}`).className = "button button-block button-solid ion-activatable ion-focusable hydrated";
       // alert(e)
       this.idbreak = e;
       this.descriptionbreak = description;
      }else{
        document.getElementById(`${this.Times[i].id}`).className = "button button-block button-outline ion-activatable ion-focusable hydrated";
        //console.log("es diferente")
      }
      
    }
  }
  check2(e, id, des){
    for(let i = 0; i < this.Times.length; i ++){
      if(this.Times[i].number == e){
        //console.log(this.breakTimes[i].id);
        document.getElementById(`${this.Times[i].number}`).className = "button button-block button-solid ion-activatable ion-focusable hydrated";
        //alert(id)
        this.idpaid = id;
        this.descriptionpaid = des;
      }else{
        document.getElementById(`${this.Times[i].number}`).className = "button button-block button-outline ion-activatable ion-focusable hydrated";
        //console.log("es diferente")
      }
      
    }
   }
   overtime(text){
    if(text == "none"){
      document.getElementById('overtime').className = "button button-block button-solid ion-activatable ion-focusable hydrated";
      document.getElementById('hours').className = "button button-block button-outline  ion-text-wrap ion-activatable ion-focusable hydrated";
      this.none ="none";
    }
    if(text =="hours"){
      document.getElementById('overtime').className = "button button-block button-outline ion-activatable ion-focusable hydrated";
      document.getElementById('hours').className = "button button-block button-solid  ion-text-wrap ion-activatable ion-focusable hydrated";
      this.none = "AFTER 40 HOURS/WEEK";
    }
   }
   
   save(){
     this.data = {
      name: this.project,
      address: this.address,
      supervisor_name: this.supervisor,
      supervisor_phone: this.phone,
      description: this.description,
      break_time: this.idbreak,
      paid_break_time: this.idpaid,
      overtime: "0",
      user_id: this.idUser,
      typeProject: this.tipo
     }
     
    this.content.scrollToTop()
     
     this.breakTime.saveProject(this.data, this.token).subscribe(res =>{
       this.enable  = true;
      if(res.type = "success"){
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000

        })
        this.slides.slidePrev();
        Toast.fire({
          type: 'success',
          title: 'project created'
        }).then((resu) =>{
          if(resu.dismiss === Swal.DismissReason.timer){
            this.enable  = false;
            this.storage.set('segment', '1');
            this.router.navigate(["/projects"]);
            this.data = {}
            this.project ="";
            this.address ="";
            this.supervisor ="";
            this.phone ="";
            this.description ="";
            this.break ="";
            this.paid ="";
            this.overtimes ="";
            this.idbreak = 0;
            this.descriptionbreak="";
            this.idpaid=0;
            this.descriptionpaid="";
            this.none="";
            this.hours="";
            this.idUser = 0;
            this.clear();
            this.slideOptsOne.initialSlide = 0;
            this.singup.reset();
            this.autocompleteItems = [];
            this.input.value = "";
            

          }
        })
        
        
        

      }else{

      }
     })
     
     //this.breakTime.saveProject(). 
   }
   stri = "";
   updateSearchResults(a){
   // this.isKeyboardopen=false;
     
    
   if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }

    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input},
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
    this.content.scrollToBottom();
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
         this.input.value = item.description;
         this.autocompleteItems = [];
         this.content.scrollToTop();
        //this.latlng = new  google.maps.LatLng(results[0].geometry.viewport.ka.h, results[0].geometry.viewport.pa.h);  

      } 
      
    })
    this.isKeyboardopen = true;
  }
  slidePrev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.noPage--;
    this.slides.lockSwipes(true);
  }
  slideNext() {
    console.log(this.address);
    if(this.input.value == "" ){
      this.presentToast('addres is required')
    }else{
    this.project = this.singup.value.project;
    this.supervisor = this.singup.value.supervisor;
    this.phone = this.singup.value.phone;
    this.description = this.singup.value.description;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.noPage++;
    this.slides.lockSwipes(true);
    this.content.scrollToTop();
    }
    
  }
  slideTime(){
    console.log(this.idbreak);
    if(this.idbreak == 0 || this.idpaid == 0) {
      this.presentToast('break time or break time paid')
    }else{
      this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.noPage++;
    this.slides.lockSwipes(true);
    this.content.scrollToTop();
    }
  }
  back(){
    this.router.navigate(['/projects']);
    this.autocompleteItems = [];
    this.input.value = "";
    this.clear();
  }
  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: `${mensaje}`,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
  hideKeyboard(evnet){
    this.isKeyboardopen = true;
    this.autocompleteItems = [];
  }
  hideKeyboardon(evnet){
    this.isKeyboardopen = false;
  }
  onKeyboardWillHide(){
    console.log("ddsf")
  }
  onKeyboardHide(){
    console.log("dd");
  }
  clear(){
    this.data = {}
            this.project ="";
            this.address ="";
            this.supervisor ="";
            this.phone ="";
            this.description ="";
            this.break ="";
            this.paid ="";
            this.overtimes ="";
            this.idbreak = 0;
            this.descriptionbreak="";
            this.idpaid=0;
            this.descriptionpaid="";
            this.none="";
            this.hours="";
            this.idUser = 0;
           // this.singup.value
           this.singup.value.project = "";
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Do you want to exit?',
      mode: 'ios',
      buttons: [{
        text: 'Exit',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
          this.back();
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
 