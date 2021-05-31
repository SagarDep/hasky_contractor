import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createprojects',
  templateUrl: './createprojects.page.html',
  styleUrls: ['./createprojects.page.scss'],
})
export class CreateprojectsPage implements OnInit {
  name:string;
  constructor() { }

  ngOnInit() {
  }
  test(){
    console.log(this.name);
  }

}
