import { Component, OnInit } from '@angular/core';
import {Company} from "../../interfaces/company";
import { TestingService } from "../../services/testing.service";
import {Storage} from "@ionic/storage";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.html',
  styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {

  Company: Company[] = [];
  name: string;
  descrition: string;
  token: string;
  id: number;
  language: any = [];
  constructor(private services: TestingService, private storage: Storage, private router: Router, private menu: MenuController) { }

  ngOnInit() {
    this.storage.get("language").then(res => {
      if (res === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].add_company[0];
 
          });
      }
      if (res === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then( json => {
            this.language = json.en[0].add_company[0];   
          });
      }
    });
    this.menu.enable(false, "first");
    this.storage.get("token").then(res =>{
    this.id = res.user;
      //this.token = res.token;
      console.log(res)
     this.token = res.token;
    })
    //console.log(this.token);
  }

  saveCompany(){
    if(this.name  ==  "" || this.descrition == ""){

    }else{
    let data = {
      name: this.name,
      description: this.descrition,
      user_id: this.id
    }
    this.services.addCompany(data, this.token).subscribe(res =>{
      if(res.type == "success"){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000

        })
        Toast.fire({
          type: 'success',
          title: 'Company saved successfully'
        }).then((resu) =>{
          if(resu.dismiss === Swal.DismissReason.timer){
            // this.router.navigate(["/user"]);
            //  this.storage.set("validate", "si");
              this.services.ediEstep(this.token, this.id).subscribe(res =>{
                if(res.type == "success"){
                  this.router.navigate(["/projects"]);
                  this.storage.set("validate", "si");
                }
              }) 
          }
        })
      }
    }) 
  }
   //console.log(this.name, this.descrition);
  }
  

}
