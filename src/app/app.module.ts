import {FormsModule} from '@angular/forms';
import {MbscModule} from '@mobiscroll/angular';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";

import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import {HttpClientModule} from "@angular/common/http";

import {IonicStorageModule} from "@ionic/storage";
import {ComponentsModule} from "./components/components.module";
import {Geolocation} from '@ionic-native/geolocation/ngx';
//import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';

import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { PdfService } from "./services/pdf.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import {FirebaseX} from "@ionic-native/firebase-x/ngx";
import {ToastService} from "./services/toast.service";
import {FirebaseService} from "./services/firebase.service";
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {ImagePicker} from '@ionic-native/image-picker/ngx';

const config = {
  apiKey: "AIzaSyC3CsC60fiq114hrQBwOrS6CPE3fdWXpVw",
  authDomain: "chat-app-4ec10.firebaseapp.com",
  databaseURL: "https://chat-app-4ec10.firebaseio.com",
  projectId: "chat-app-4ec10",
  storageBucket: "chat-app-4ec10.appspot.com",
  messagingSenderId: "1046018721855",
  appId: "1:1046018721855:web:d360cbb3fc680028aa508a",
  measurementId: "G-XHV2PWHJ6B"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot({hardwareBackButton: false}),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    //FileTransfer,
    //FileTransferObject,
    DocumentViewer,
    FileOpener,
    OneSignal,
    BarcodeScanner,
    Keyboard,
    PdfService,
    InAppBrowser,
    GooglePlus,
    SignInWithApple,
    FirebaseX,
    FirebaseService,
    ToastService,
    AngularFireDatabase,
    ImagePicker,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
