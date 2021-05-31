import { Component, NgZone, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TestingService } from "../services/testing.service";
import { RootObject, Ability, Ability2 } from "../interfaces/interface";
import { Respuesta } from "../interfaces/contractor";
import { Observer, observable } from "rxjs";

import {FormControl} from "@angular/forms";
import Swal from 'sweetalert2'

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"]
})
export class TestPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  


  habilidades: Ability2[] = [];
  userus = {};
  constructor(private http: HttpClient, private abiliti: TestingService) {}
  ngOnInit() {
    this.abiliti.getAbilities().subscribe(res => {
      // console.log(res);
      this.habilidades.push(...res.abilities);
      console.log(this.habilidades);
    });

    this.abiliti.getContractor().subscribe(data => {
      this.userus = data;
      console.log(this.userus);
    });
  }
  test(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })
    
    Toast.fire({
      type: 'success',
      title: 'Signed in successfully'
    })
  }
    random_password_generate(max,min)
  {
      var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
      var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
      var randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
      return randPassword;
  }

     generate() {
      let a = this.random_password_generate(8,8);
      alert(a);
    }
}
