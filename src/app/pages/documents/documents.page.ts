import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TestingService } from '../../services/testing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  constructor(private loadingController: LoadingController, private storage: Storage, private services: TestingService, private router: Router) { }
  nombreArchivo = '';
  document = false;
  token: string;
  id: number;
  ngOnInit() {
    this.nombreArchivo = '';
  }
  ionViewWillEnter(){
    this.storage.get("token").then(res =>{
      this.token = res.token;
      this.id = res.user;
    })
    this.nombreArchivo = '';
  }

  selectedFile = null;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nombreArchivo = this.selectedFile.name;
    
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

async presentLoading(loading) {
  return await loading.present();
}

}
