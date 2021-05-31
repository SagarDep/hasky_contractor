import { Component, OnInit, NgZone, ViewChild} from '@angular/core';
import { Storage } from '@ionic/storage';
import { TestingService } from '../../../services/testing.service';
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import { ToastController, IonInput } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  @ViewChild ('addres', {static: true}) input: IonInput;
  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  image = false;
  document = false;
  constructor(private storage: Storage, private services: TestingService, private loadingController: LoadingController, private router: Router, public geolocation: Geolocation, public zone: NgZone, public toastController: ToastController) {
    this.geocoder = new google.maps.Geocoder;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
   }
   address: string;
  user: any = [];
  name: string;
  last: string;
  email: string;
  phone: string;
  token: string;
  id: number;
  lat: string;
  lng: string;
  language: any = [];
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get("token").then(res =>{
      this.getUser(res.token, res.user);
      this.token = res.token;
      this.id = res.user;
    })

    this.storage.get("language").then(data => {
      // console.log("init");
  
       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].edit_user[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].edit_user[0];
             console.log(this.language);
           });
       }
     });
  }

  async getUser(token, id){
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    await this.services.getUser(token, id).subscribe(res =>{
      this.name = res.data.first_name;
      this.last = res.data.last_name;
      this.email = res.data.email;
      this.phone = res.data.phone_number;
      this.address = res.data.address;
      loading.dismiss();
    })
  }

  async presentLoading(loading) {
		return await loading.present();
  }

  async save(){
    if(this.name == ""){
      this.presentToast("Firts name is required");
    }
    else if( this.last == ""){
      this.presentToast("Last name is required");
    }
    else{
    let location :string;
    location = `${this.lat}, ${this.lng}`;
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    let data = {
      first_name: this.name,
      last_name: this.last,
      email: this.email,
      phone_number: this.phone,
      id: this.id,
      address: this.address,
      location: location
      
    } 
    await this.services.editUser(data, this.token).subscribe(res =>{  
      if(res.type == "success"){
        
          loading.dismiss();
              this.router.navigate(["/profile"]);
        
      }
      })
    } 
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
     //this.content.scrollToBottom();
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
       
       // console.log( results[0].geometry.viewport);
        this.address = item.description;
        
        
        this.lat =  results[0].geometry.viewport.Za.j;
        this.lng =  results[0].geometry.viewport.Ua.j;

        this.input.value = item.description;

        //this.latlng = new  google.maps.LatLng(results[0].geometry.viewport.ka.h, results[0].geometry.viewport.pa.h);  

      }
      
    })
  }
  selectedFile = null;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
 async uploadPicture(){
    if(this.selectedFile == null){
      this.image = true;
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
        loading.dismiss();
        this.router.navigate(["/profile"]);
      }
      })
    }
  }
  async saveDocument(){
    if(this.selectedFile == null){
      this.document =  true;
    }else{
      const loading = await this.loadingController.create({
        message: ''
      });
      this.presentLoading(loading);
    let data = {
      user_id: this.id,
      file: this.selectedFile
    }
    this.services.addDocumentd(data, this.token).subscribe(res =>{
      if(res.type == "success"){
        loading.dismiss();
        this.router.navigate(["/profile"]);
      }
    })
  }
}

async presentToast(mensaje) {
  const toast = await this.toastController.create({
    message: `${mensaje}`,
    duration: 2000,
    position: "top"
  });
  toast.present();
}
back(){
  this.router.navigate(["/profile"]);
}

}
