import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides, LoadingController, IonContent, ToastController, ActionSheetController } from "@ionic/angular";
import { TestingService } from '../../../services/testing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-add-worker",
  templateUrl: "./add-worker.page.html",
  styleUrls: ["./add-worker.page.scss"]
})
export class AddWorkerPage  {
  enable = false;
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  constructor(public loadingController: 
    LoadingController, 
    private services: TestingService, 
    private activateRouter: ActivatedRoute, 
    private Storage: Storage, 
    private router: Router,
    public toastController: ToastController, 
    public actionSheetController: ActionSheetController) {}
    skill = "";
  language: any = [];
  button: any = [];
  p1: any = [];
  p2: any = [];
  p3: any = [];
  p4: any = [];
  p5: any = [];
  p6: any = [];
  p7: any = [];
  p8: any = [];
  p9: any = [];
  pe: any = [];
  Trades: any[] = [];
  tradeId = "";
  projectId= ""; 
  datestart: Date = new Date();
  datend: Date =  new Date();
  startD: string;
  endD: string;
  changeColor22="click22";
  priceTrade: string;
  valueExperiencie: number;
  numWorke: number= 0;
  startT= "";
  endT = "";
  toke: string;
  daysS: string;
  startTimen = "";
  endTimes =  "";
  mindate = "";
  experience = [ 
    {
      name: "apprentice"
    },
    {
      name: "basic"
    },
    {
      name: "expert"
    }
  ]; 
  days = [
    {
      id: "1",
      name: "Monday",
      isChecked: false
    },
    {
      id: "5",
      name: "Friday",
      isChecked: false
    },
    {
      id: "2",
      name: "Tuesday",
      isChecked: false
    },
    {
      id: "6",
      name: "Saturday",
      isChecked: false
    },
    {
      id: "3",
      name: "Wednesday",
      isChecked: false
    },
    {
      id: "0",
      name: "Sunday",
      isChecked: false
    },
    {
      id: "4",
      name: "Thursday",
      isChecked: false
    }
  ];
  temporal = [];
  idTrades: number;
  especiality: "";
  changeColor="click";
  changeColor2="click2"
  noPage = 1;
  task: string;
  labor = "";
  tipo: string;
  ionViewWillEnter() {
    this.Storage.get("language").then(data => {
     // console.log("init");

      if (data === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.en[0].menu[0];
            this.button = json.en[0].button[0];
            this.p1 = json.en[0].add_worker[0].page1[0];
            this.p2 = json.en[0].add_worker[0].page2[0];
            this.p3 = json.en[0].add_worker[0].page3[0];
            this.p4 = json.en[0].add_worker[0].page4[0];
            this.p5 = json.en[0].add_worker[0].page5[0];
            this.p6 = json.en[0].add_worker[0].page6[0];
            this.p7 = json.en[0].add_worker[0].page7[0];
            this.p8 = json.en[0].add_worker[0].page8[0];
            this.p9 = json.en[0].add_worker[0].page9[0];
            this.pe = json.en[0].add_worker[0].page_end[0];
            console.log(json.en[0].add_worker[0].page9[0]);
          });
      }
      if (data === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].menu[0];
            this.button = json.es[0].button[0];
            this.p1 = json.es[0].add_worker[0].page1[0];
            this.p2 = json.es[0].add_worker[0].page2[0];
            this.p3 = json.es[0].add_worker[0].page3[0];
            this.p4 = json.es[0].add_worker[0].page4[0];
            this.p5 = json.es[0].add_worker[0].page5[0];
            this.p6 = json.es[0].add_worker[0].page6[0];
            this.p7 = json.es[0].add_worker[0].page7[0];
            this.p8 = json.es[0].add_worker[0].page8[0];
            this.p9 = json.es[0].add_worker[0].page9[0];
            this.pe = json.es[0].add_worker[0].page_end[0]; 
            //console.log(json.es[0].add_worker[0].page9[0]);
          });
      }
    });
    this.getTrades();
    console.log(this.experience)
    this.projectId = this.activateRouter.snapshot.paramMap.get('id');
    this.tipo = this.activateRouter.snapshot.paramMap.get('tipo');
    this.Storage.get("token").then(res =>{
      this.toke = res.token;
      //console.log(this.toke) 
    })
    this.slides.lockSwipes(true);
    let manana = new Date();
    let c = manana.getDate() + 1;
    let d = manana.getMonth() + 1; 
    let a;
    let b;
    if( d == 1 || d == 2 || d == 3 || d == 4 || d == 5 || d == 6 || d == 7 || d == 8 || d == 9){ a = `0${manana.getMonth()+1}`;} else a = manana.getMonth()+1;
    if(c == 1 || c == 2 || c == 3 || c == 4 || c == 5 || c == 6 || c == 7 || c == 8 || c == 9){ b = `0${manana.getDate() + 1 }`;} else b = manana.getDate() + 1;
    let e = `${manana.getFullYear()}-${a}-${b}`;
    var utc = new Date().toJSON().slice(0,10);
    this.mindate = e;
    //this.mindate =  '2019-12-06' ;
    console.log(e +' ' + utc);
  }
 
  slidePrev() {
    this.content.scrollToTop();
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.noPage--;
    this.slides.lockSwipes(true);
  }
  slideNext() {
    this.content.scrollToTop();
    if(this.noPage == 1 && this.idTrades == undefined){

    }else if(this.noPage == 2 && this.valueExperiencie == undefined){

    }
    else if(this.noPage == 3 && this.numWorke == 0){

    }
    else if(this.noPage == 4){

      let a = new Date(`${this.startD}`);
      let b = new Date(`${this.endD}`);
      //console.log(this.endD.slice(0,4));
     
      if(this.startD == undefined ||  this.endD == undefined){

      }
      else{
        if(b < a){
          console.log('');
          this.presentToast("start date must be greater than the end date");
        }else{

          if(this.tipo == "Express"){
            if(this.difFecha(a,b)){
              //console.log("si se puede son dos dias")
              this.slides.lockSwipes(false);
              this.slides.slideNext();
              this.noPage++;
              this.slides.lockSwipes(true);
            }  else{
              this.presentToast("an express project can only last 2 days");
            }
          }else{
          this.slides.lockSwipes(false);
          this.slides.slideNext();
          this.noPage++;
          this.slides.lockSwipes(true);
          }
        }
      }
    }
    else if(this.noPage == 5){
      this.dias();
      if(this.daysS == undefined || this.daysS == ""){

      }else{
        this.slides.lockSwipes(false);
        this.slides.slideNext();
         this.noPage++;
        this.slides.lockSwipes(true);
      }
    }
    else if(this.noPage == 7){
      if(this.startTimen == "" || this.endTimes == ""){
        console.log("entro aqui")
      }else{
       this.slides.lockSwipes(false);
        this.slides.slideNext();
         this.noPage++;
        this.slides.lockSwipes(true);
        console.log(this.startTimen)
      }
    }
    else if(this.noPage == 8 ){
      if(this.task == undefined || this.task == ""){

      }else{
        this.skill = `${this.especiality} $${this.priceTrade}/hr`;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.noPage++;
        this.slides.lockSwipes(true);
      }
    }
    else{
      
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.noPage++;
    this.slides.lockSwipes(true);
      
    }
  }
  slideWorker(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.noPage++;
    this.slides.lockSwipes(true);
  } 
  async getTrades(){
    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
     await this.services.getTrades().subscribe( res =>{
       this.Trades = res.data;
       loading.dismiss();
     })
    }

    saveTrades(id, name){
      for(let i = 0; i < this.Trades.length; i++){
        if(this.Trades[i].id == id){
          document.getElementById(`${this.Trades[i].id}`).className = "onclick";
          this.idTrades = id;
          this.especiality = name;
          this.labor = name;
          //alert(this.idTrades);
        }else{
          document.getElementById(`${this.Trades[i].id}`).className = "click";
        }
      }
    }
    saveExperience(id, value){
      for(let i = 0; i < this.experience.length; i++){
        if(this.experience[i].name == id){
          document.getElementById(`${this.experience[i].name}`).className = "onclick2 md ion-activatable hydrated";
          this.valueExperiencie = value;
        
        }else{
          document.getElementById(`${this.experience[i].name}`).className = "click22 md ion-activatable hydrated";
        }
      }
      this.priceTrades(this.idTrades, this.valueExperiencie);
    }
    
    changeDate(event){
      //let a : string;
      this.startD = event.detail.value;
      //console.log(this.startD.substr(0,10));
      //console.log(this.datestartw)
      this.startD =  this.startD.substr(0,10);
   
      
    }
    changeDateEnd(event){
      this.endD =  event.detail.value;
      this.endD =  this.endD.substr(0,10);
      console.log(this.endD)
      this.getDates();
    }


  async presentLoading(loading) {
		return await loading.present();
  }

  async priceTrades(id, type){

    const loading = await this.loadingController.create({
      message: ''
    });
    this.presentLoading(loading);
    if(type == "all"){
      this.priceTrade = "10.00";
      loading.dismiss();
    }else{
    this.services.priceTrades(id, type).subscribe(res =>{
        if(res.data.length == 0){
          console.log("es indefinido");
          this.priceTrade = "10.00";
          loading.dismiss();
        } else{
          console.log(res.data[0].cost);
          this.priceTrade = res.data[0].cost;
          loading.dismiss();
          }
        }, error => {
      loading.dismiss();
      }) 
    }
  }
  sumPrice(){
    let price;
    price = this.priceTrade;
    price = parseFloat(this.priceTrade) + 0.50;

    this.priceTrade = price;
  }
  removePrice(){
    let price;
    price = this.priceTrade;
    if(price == 0){

    }else{
    price = parseFloat(this.priceTrade) - 0.50;

    this.priceTrade = price;
    }
  }
  sumWorker(){
    this.numWorke++;
  }
  minWorker(){
    if(this.numWorke <= 0){

    }else{
      this.numWorke--;
    }
  }
  startTime(event){
    this.startTimen = this.startT.substr(11,5);
    console.log(this.startT.substr(11,5));
  }
  endTime(){
    this.endTimes = this.endT.substr(11,5);
    console.log("final riempo", this.endT.substr(11,5));
  }
 async saveAddworker(){
   this.enable = true;
    //this.dias();
    const loading = await this.loadingController.create({
      message: ''
    });
    let data = {
        trade_id: this.idTrades,
        experience: this.valueExperiencie,
        quantity_workers: this.numWorke,
        start_date: this.startD,
        end_date: this.endD,
        weekdays: this.daysS,
        cost: this.priceTrade,
        start_time: this.startT.substr(11,5),
        end_time: this.endT.substr(11,5),
        project_id: this.projectId ,
        task: this.task
    }
    this.services.addRequestorker(data, this.toke).subscribe(res =>{
      loading.dismiss();
      this.enable = false;
      this.router.navigate(['/projects']);
    }, error=>{
      loading.dismiss();
    }) 
  }

  dias(){
    this.temporal = [];
    for(let i = 0; i < this.days.length; i++ ){
      if(this.days[i].isChecked == true){
        this.temporal.push(`${this.days[i].name}|`);
      }
    }
    //console.log(this.temporal);
    //console.log(this.temporal.join(''));
    this.daysS = this.temporal.join('');
    console.log(this.daysS);
  }
  back(){
    this.router.navigate(['request-worker']);
  }
  logScrollEnd(event){
    console.log(event);
  }
  getDates(){
    for(let i = 0; i < 7; i++){
      this.days[i].isChecked = false;
    }
    //console.log(this.startD.slice(-2));
    let start: Date = new Date(`${this.startD}`);
    let end: Date = new Date(`${this.endD}`);
    let tot = parseInt(this.endD.slice(-2)) - parseInt(this.startD.slice(-2));
    if(tot >= 6){
      for (let i = 0; i < 5; i++){
        this.days[i].isChecked = true;
      }
    }else{
      //console.log(start.getDay());
      
      while (end.getTime()>= start.getTime()){
        start.setDate(start.getDate() +1 );
        console.log(start.getFullYear() + '/' + (start.getMonth()+ 1) + '/' + start.getDate());
        console.log(start.getDay());
        for(let i = 0; i < 7 ; i++){
          if(start.getDay() == parseInt(this.days[i].id)){
            this.days[i].isChecked = true;
          }
        }
      }
    }
    //console.log(tot);
    /*  
   let  datestartw: Date = new Date(`${date} 12:00:00`);
   return datestartw;
  }
*/}
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: `${txt}`,
      position: 'top',
      duration: 2000
    });
    toast.present();
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
  difFecha(a, b): boolean{
    let fechaInicio = new Date(a).getTime();
    let fechaFin    = new Date(b).getTime();

    let diff = fechaFin - fechaInicio;
    let f = diff/(1000*60*60*24);
    return f <= 2 ?  true: false;
    //console.log( );
  }

}
