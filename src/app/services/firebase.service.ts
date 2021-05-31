import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ChatMessageType} from "../interfaces/chat-message";
import {ChatUserType, DEFAULT_USER} from "../interfaces/chat-user";
import {FirebaseX} from "@ionic-native/firebase-x/ngx";
import {ToastService} from "./toast.service";
import {Storage} from "@ionic/storage";

@Injectable()
export class FirebaseService {
  messageRef = this.firestore.collection('message');
  messageQueryRef = 'message';
  userRef = this.firestore.collection('user');

  constructor(public firestore: AngularFirestore,
              public firebaseX: FirebaseX,
              private storage: Storage,
              public toast: ToastService) {
  }

  insertMessage(message: ChatMessageType) {
    message.createdAt = Date.now();
    return this.messageRef.add(message);
  }

  getMessage(chatId: string) {
    return this.firestore.collection<ChatMessageType>(this.messageQueryRef, ref => {
        return ref.where('chatId', '==', chatId);
      }
    ).valueChanges();
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }


  async upsertUser(user: ChatUserType) {
    console.log('User inserted');
    user.updatedAt = Date.now();
    user.createdAt = Date.now();
    await this.userRef.doc(`${user.uid}`).set(user, {merge: true});
  }

  getAllUser() {
    return this.userRef.valueChanges();
  }

  setUpNotification() {
    this.firebaseX.hasPermission().then(permission => {
      if (!permission) {
        this.firebaseX.grantPermission();
      }
    });

    this.firebaseX.getToken()
      .then((token: string) => {
        console.log(`The token is ${token}`);
        this.saveToken(token);
      }).catch(error => console.error('Error getting token', error));

    this.firebaseX.onMessageReceived()
      .subscribe(data => {
        if (data.page === 'Chat') {
          this.toast.presentToast(data.title + '\n' + data.body);
        }
      });

    this.firebaseX.onTokenRefresh()
      .subscribe((token: string) => {
        this.saveToken(token);
      });
  }

  onNotificationReceived() {
    return this.firebaseX.onMessageReceived();
  }

  saveToken(token) {
    this.storage.get("token").then(async res => {
      let user: ChatUserType = DEFAULT_USER;
      user.uid = res.user;
      user.fcmToken = token;
      if (user.uid)
        await this.upsertUser(user);
    });
  }
}
