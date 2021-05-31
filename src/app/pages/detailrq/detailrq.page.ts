import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailrq',
  templateUrl: './detailrq.page.html',
  styleUrls: ['./detailrq.page.scss'],
})
export class DetailrqPage implements OnInit {

  constructor(private activate: ActivatedRoute) { }
  data = "";
  newdata: any = [];
  projectId: string;
  requestId: string;
  userId: string;
  date: string;
  time: string;
  ngOnInit() {
    this.newdata = [];
    this.data = this.activate.snapshot.paramMap.get('data');
    this.newdata = this.data.split(" ");
    //alert(this.newdata[0]);
    this.projectId = this.newdata[0];
    this.requestId = this.newdata[1];
    this.userId = this.newdata[2];
    this.date = this.newdata[3];
    this.time = this.newdata[4];
    alert(this.projectId.substring(10) + this.requestId.substring(10) + this.userId.substring(8)+ this.date.substring(5)+ this.time.substring(5));
  }

}
