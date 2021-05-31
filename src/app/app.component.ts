import {Component} from "@angular/core";

import {Platform} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {FirebaseService} from "./services/firebase.service";


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  showNotification = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseService: FirebaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#333232');
      //this.statusBar.styleDefault();

      this.splashScreen.hide();

      this.firebaseService.setUpNotification();
      this.firebaseService.onNotificationReceived().subscribe(data => {
        this.showNotification = true;
      })
    });
  }
}
