import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TestingService } from '../../services/testing.service';
import { Router } from '@angular/router';
import { Notifiacions, notifications } from '../../interfaces/notifications';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private storage: Storage, private services: TestingService, private router : Router) { }
  language: any = [];
  
  token: string;
  notifications = true;
  notification: notifications[] = [];
  data = true;
  ngOnInit() {
    this.storage.get("language").then(res => {
      if (res === "es") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then(json => {
            this.language = json.es[0].notifications[0];
 
          });
      }
      if (res === "en") {
        fetch("../../../assets/language.json")
          .then(res => res.json())
          .then( json => {
            this.language = json.en[0].notifications[0];   
          });
      }
    });
  }
  async ionViewWillEnter() {
    this.notification = [];
    this.data = true;
    await this.getToken();
    await this.services.Notifiacions(this.token).subscribe(res => {
      console.log(res)
        if(res.data.length != 0){
          this.notifications = false;
        }
        this.notification.push(...res.data);
      })
      setTimeout(() => {
        this.data = false;
    }, 2000);
    }

    async getToken(){
      await this.storage.get("token").then(res =>{
        this.token = res.token;
     })
    }

    openProject(id, title){
      this.router.navigate(['/workers-details', id]);
    }
}
