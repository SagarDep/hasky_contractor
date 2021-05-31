import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Storage } from "@ionic/storage";
import { TestingService } from '../../../services/testing.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { LoadingController, IonInput } from '@ionic/angular';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
declare var google;
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.page.html',
  styleUrls: ['./edit-company.page.scss'],
})
export class EditCompanyPage implements OnInit {
  @ViewChild ('addres', {static: true}) input: IonInput;
    name: string;
    description: string;
    id: number;
    url: string;
    token: string;
    phone: string;
    address: string;
    email: string;
    rfc: string;
    rs: string;
    image = false;
    singup: FormGroup;
    map: any;
    userId: string;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  guardar = "";
  disable = true;
  language: any = [];
  images = "";
  mostrar = "";
  constructor(private storage: Storage, private services: TestingService, private router: Router, private loadingController: LoadingController, public formBuilder: FormBuilder, public geolocation: Geolocation, public zone: NgZone) {
    this.geocoder = new google.maps.Geocoder;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];

    this.singup = this.formBuilder.group({
      name: new FormControl(
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
      ),
      phone_number: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          
        ])
      ),
      address: new FormControl(
        "",
        Validators.compose([
          Validators.required,
         
          
        ])
      ),
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
         
          
        ])
      ),
      rfc: new FormControl(
        "",
        Validators.compose([
          Validators.required,
         
          
        ])
      ),
      rs: new FormControl(
        "",
        Validators.compose([
          Validators.required,
         
          
        ])
      )
    });
  }
  ngOnInit() {
    this.mostrar = "";
    this.storage.get("language").then(data => {
      // console.log("init");
  
       if (data === "en") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.en[0].edit_company[0];
             console.log(this.language);
           });
       }
       if (data === "es") {
         fetch("../../../assets/language.json")
           .then(res => res.json())
           .then(json => {
             this.language = json.es[0].edit_company[0];
             console.log(this.language);
           });
       }
     });
  }

 async save(){
   if(this.guardar == "guardar" ){
    if(this.name ==  undefined || "" || this.description == undefined || "" || this.phone == undefined || "" || this.email == undefined || this.rfc == ""|| undefined || this.rs == ""|| undefined || this.address == ""||undefined ){

    }else{
      const loading = await this.loadingController.create({
        message: ''
      });
      this.presentLoading(loading);
      let data = {
        user_id: this.userId,
        name: this.singup.value.name,
        description: this.singup.value.description,
        phone_number: this.singup.value.phone_number,
        address: this.address,
        email: this.singup.value.email,
        rfc: this.singup.value.rfc,
        rs: this.singup.value.rs
      }
      this.services.addCompanyInUser(data, this.token).subscribe(res =>{
        if(res.type == "success"){
          this.router.navigate(["/profile"]);
          loading.dismiss(); 
        }else{
          loading.dismiss();
        }
      }, error =>{
        loading.dismiss();
      })

    }
   }else{
        if(this.name ==  "" || this.description == "" || this.phone == "" || this.email == "" || this.rfc == "" || this.rs == "" || this.address == "" ){

        }else{
          const loading = await this.loadingController.create({
            message: ''
          });
          this.presentLoading(loading);
          let data = {
            company_id: this.id,
            name: this.singup.value.name,
            description: this.singup.value.description,
            phone_number: this.singup.value.phone_number,
            address: this.address,
            email: this.singup.value.email,
            rfc: this.singup.value.rfc,
            rs: this.singup.value.rs
            
          }
          this.services.ediCompany(data, this.token).subscribe(res =>{
            if(res.type == "success"){
              this.router.navigate(["/profile"]);
              loading.dismiss(); 
            }else{
              loading.dismiss();
            }
          })
        }
      }
  }
  ionViewWillEnter(){
    this.mostrar = "";
    this.storage.get("token").then(res =>{
      this.token = res.token;
      this.userId = res.user;
    
    })
    this.storage.get("company").then(res =>{
      if(res.id == undefined){
        this.guardar = "guardar";
        this.disable = true;
        console.log(this.guardar);
      }else{
        this.guardar = "editar";
        this.disable = false;
        this.id = res.id;
        this.url = res.url;
        this.getCompany(res.id, this.token);
      }
     // this.name = res.name;
     // this.description = res.description;
     
   })
  }
  selectedFile = null;
  
  onFileSelected(event) {
    this.mostrar = "imag";
    this.selectedFile = event.target.files[0];
    console.log(event.target.value);
    //this.images = event.target.value;
    var output:any = document.getElementById('output');
    //document.getElementById("output").width = "100";
    output.src = URL.createObjectURL(event.target.files[0]);
    
  }
  async uploadPicture(){
    if (this.selectedFile  == null){
      this.image = true;
    }else{
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    let data = {
      company_id: this.id,
      file: this.selectedFile
    }
    this.services.ediCompanyImage(data, this.token).subscribe( res =>{
      if(res.type == "success"){
        this.router.navigate(["/profile"]);
        loading.dismiss(); 
      }else{
        loading.dismiss();
       }
      })
    }
  }
  async presentLoading(loading) {
		return await loading.present();
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
       
        console.log(item.description);
        this.address = item.description;
        this.input.value = item.description;
        //this.latlng = new  google.maps.LatLng(results[0].geometry.viewport.ka.h, results[0].geometry.viewport.pa.h);  

      }
      
    })
  }
  getCompany(id, token){
    this.services.getCompany(id, token).subscribe(res =>{
      this.name =  res.data.name;
      this.description = res.data.description;
      this.phone = res.data.phone_number;
      this.email = res.data.email;
      this.rfc = res.data.rfc;
      this.rs = res.data.rs;
      this.address = res.data.address;
    })
  }
  back(){
    this.router.navigate(["/profile"]);
  }
}
