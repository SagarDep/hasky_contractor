import {Component, Input, NgZone, OnInit} from "@angular/core";
import {MenuController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {TestingService} from '../../services/testing.service';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  language: any = [];
  leido = true;
  token: string;
  id: string;
  email = true;
  @Input() showNotificationBadge;

  constructor(
    private menu: MenuController,
    private storage: Storage,
    private router: Router,
    private services: TestingService,
    private ngzo: NgZone

  ) {
  }

  async ngOnInit() {

    this.storage.get("language").then(data => {
      if (data === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.en[0].menu[0];
            console.log(this.language);
          });
      }
      if (data === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].menu[0];
            console.log(this.language);
          });
      }
    });
    await this.getToken();

  }
  projects() {
    this.router.navigate(["./projects"]);
    this.menu.close("first");
    // alert("hola");
  }
  notifications() {
    this.router.navigate(["./notifications"]);
    this.menu.close("first");
    this.markAsNotifications();
  }
  home(){
    this.router.navigate(["./user"]);
    this.menu.close("first");
  }
  back(){
    this.router.navigate(["./home"]);
    this.menu.close("first");
    this.storage.remove("validate");
  }
  profile(){
    this.router.navigate(["./profile"]);
    this.menu.close("first");
  }
  messages(){
    this.router.navigate(["./messages"]);
    this.menu.close("first");
  }
  viewQr(){
    this.router.navigate(["./view-qr"]);
    this.menu.close("first");
  }
  async ionViewWillEnter() {
    await this.getToken();
  }
  async getToken(){
    await this.storage.get("token").then(res =>{
      this.token = res.token;
      this.id =  res.user;
      console.log("token");
   })

   this.GetNotifications();
   await this.getuser();
  }
  async GetNotifications(){
    await this.services.Notifiacions(this.token).subscribe(res => {
      for(let i = 0; res.data.length; i++){
        if(res.data[i].read_at == null){
          console.log("hay no leidos");
          this.leido = false;
        }
      }
    })
  }
  async markAsNotifications() {
    this.showNotificationBadge = false;

    await this.services.markAsNotification(this.token).subscribe(res => {
      if (res.type == "success") {
        this.leido = true;
      }
    });
  }

  async getuser(){
    await this.services.getUser(this.token, this.id).subscribe(res => {
      if(res.data.email === 'jioc396@gmail.com'){
        this.email = false;
        //console.log(this.email);
      }
    });
  }
}
