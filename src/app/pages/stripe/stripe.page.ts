import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MbscNumpadDecimalOptions } from '@mobiscroll/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { TestingService } from '../../services/testing.service';

//import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
declare var Stripe;
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage  {

  // cloudAPIBaseURL: string = 'http://localhost:3000';
  cloudAPIBaseURL: string = 'https://stripeapphasky.herokuapp.com';

  a= "pk_live_3tLlguOv1C3jGffF2yUciYI600n89h7wtZ";
  stripel = Stripe('pk_live_3tLlguOv1C3jGffF2yUciYI600n89h7wtZ');
  // stripel = Stripe('pk_test_HCj02xjA3qjrnBkNsmw1zDy700FjbKUTh0');
  card: any;
  numpad: number;
  token: string;
  idUser: string;
  idRequest: string;
  totalPay: any = 0;
  haskyfree: number;
  totalAmount: number;
  cost_hours: number;
  total_hours: number;
  tokenStripe: string;
  stripe_key = 'pk_test_HCj02xjA3qjrnBkNsmw1zDy700FjbKUTh0';
  cardDetails: any = {};
  searched: Boolean = false;
  numbercard= "";
  verifycardN: boolean;
  month = "";
  date = "";
  verifyDate: boolean;
  cvc = "";
  verifycvc: boolean;
  endDate: string;
  startDate: string;
  constructor(
    private Storage: Storage,
    private Router: Router,
    private services: TestingService,
    private activate: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private iab: InAppBrowser
  ) { }

  async ionViewWillEnter(){
    this.idRequest = await this.activate.snapshot.paramMap.get('id');
    this.setupStripe();
   // this.storage();
    
  }


  async presentToast(string ) {
    const toast = await this.toastController.create({
      message: `${string}`,
      duration: 2000,
      position: 'top',
      color: 'light'
    });
    toast.present();
  }
  async presentLoading(loading) {
    return await loading.present();
  }

  // getRequestWorker() {
  //   return this.services.getRequesWorker(this.idRequest, this.token)
  //     .subscribe( response => {
  //       console.log(response);
  //       return response;
  //     });
  // }

  getPayer() {
    return this.services.getUser(this.token, this.idUser);
  }

  async checkout() {
    if(this.searched) {

      if(this.totalPay === 0) {
        const toast = await this.toastController.create({
          message: `There is nothing to pay for at the moment.`,
          duration: 2000,
          position: 'top',
          color: 'light'
        });
        toast.present();
      } else {
        // this.getRequestWorker();

        // const browser = this.iab.create(`${this.cloudAPIBaseURL}/create-checkout-session`, '', {
        //   hideurlbar: 'yes',
        //   toolbar: 'no',
        //   hidenavigationbuttons: 'yes',
        //   toolbarcolor: 'white'
        // });

        // if(browser.on('loadstart').subscribe) {
        //   browser.on('loadstart').subscribe((e) => {
        //     const veri = 'haskyconnections';
        //     let urs = e.url.slice(8,24);
        //     console.log(urs);
        //     if(veri == urs) {
        //       let u = e.url;
        //       let ur = new URL(u);
        //       let success = ur.searchParams.get('success');
        //       console.log('aaaaaaaa', success);
        //       browser.close();
        //     }
        //   });
        // }

        return this.getPayer().subscribe( response => {
          const user = response.data;
          return this.http.post(`${this.cloudAPIBaseURL}/create-checkout-session`, {
              request_id: this.idRequest,
              total_hours: this.total_hours,
              cost_hours: +this.cost_hours,
              total_amount: this.totalAmount,
              hasky_fee: this.haskyfree,
              user
            })
            .subscribe( async (response: any) => {

              const result = await this.stripel.redirectToCheckout({
                sessionId: response.id
              });

              console.log(result);

              if (result.error) {
                console.error(result.error);
                const toast = await this.toastController.create({
                  message: result.error.message,
                  duration: 2000,
                  position: 'top',
                  color: 'danger'
                });
                toast.present();
              }
              
            });
        });


      }

    } else {
      const toast = await this.toastController.create({
        message: `Please select the weeks for the payment.`,
        duration: 2000,
        position: 'top',
        color: 'light'
      });
      toast.present();
    }
  }

  searchPay(){
   this.Storage.get("token").then(res =>{
      this.idUser = res.user;
      this.token = res.token;
      //z,e
      this.services.payment(this.idRequest, this.startDate.substring(0,10), this.endDate.substring(0,10), this.token).subscribe(res =>{
        let hasky = res['data'].haskyconnection;
        let total = res['data'].total;
        this.totalAmount = total;
        this.haskyfree = res['data'].haskyconnection;
        this.cost_hours = res['data'].cost_hours;
        this.total_hours = res['data'].total_hours;
        this.totalPay = hasky + total;
        this.searched = true;
       console.log(hasky + total);
     });
     //console.log( 'el token es', res);
    });
  }
  
   

  setupStripe() {
    let elements = this.stripel.elements();
    var style = {
      base: {
        color: '#fff',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#fff'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    console.log(this.card);
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)
      if(this.totalPay != 0){
        this.stripel.createSource(this.card).then(async result => {
          const loading = await this.loadingController.create({
                 message: ""
               });
          if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            this.presentLoading(loading);
            console.log(result['source']['id']);
            //console.log(result);
            this.makePayments(result);
            console.log("imprime esto: ", this.totalPay.toFixed(2)*100);
            this.services.paymentStripe(this.token, Math.round(this.totalPay.toFixed(2)*100), `pay $${this.totalPay} for ${this.total_hours} hours and $${this.haskyfree} dls of haskyconnections`, result['source']['id']).subscribe(resp =>{
                      if(resp["type"]== "success"){
                        loading.dismiss();
                        this.presentToast("payment successful");
                        this.Router.navigate(["/projects"]);
                       
                        
                      }else{
                        this.presentToast('error');
                        console.log(resp)
                        loading.dismiss();
                      }
            }, error=> {this.presentToast('error');  loading.dismiss();});
          }
        });
      }else{
        this.presentToast("Select payment week");
      }
      

      
    });
  }

  makePayments(token) {
    this.http
      .post('https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe', {
        token: token.id
      })
      .subscribe(data => {
        console.log('data correcta ', data);
      });
  }


}
