import {Component, ViewChild} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {ChatMessageType, DEFAULT_MESSAGE} from "../../interfaces/chat-message";
import {FirebaseService} from "../../services/firebase.service";
import {ChatUserType} from "../../interfaces/chat-user";
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Observable} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {finalize} from "rxjs/operators";


@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage {
  currentUser: ChatUserType;
  selectedUser: ChatUserType;
  inputText: string;
  message: ChatMessageType = DEFAULT_MESSAGE;
  messages: ChatMessageType[];
  chatId = '';

  task: AngularFireUploadTask;

  progress: any;  // Observable 0 to 100

  imageResponse: any;
  options: any;

  ask: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  // @ts-ignore
  @ViewChild('content') private content: any;

  constructor(private route: ActivatedRoute,
              public db: AngularFireDatabase,
              private firebaseService: FirebaseService,
              private imagePicker: ImagePicker,
              public storage: AngularFireStorage,
              private toast: ToastService) {
    this.route.queryParams.subscribe(params => {
      this.currentUser = JSON.parse(params.currentUser) as ChatUserType;
      this.selectedUser = JSON.parse(params.selectedUser) as ChatUserType;
      // tslint:disable-next-line:max-line-length
      this.chatId = (this.currentUser.uid > this.selectedUser.uid) ? `${this.currentUser.uid}-${this.selectedUser.uid}` : `${this.selectedUser.uid}-${this.currentUser.uid}`;

      this.firebaseService.getMessage(this.chatId).subscribe(data => {
        this.messages = data as ChatMessageType[];
        this.messages = this.messages.sort(this.firebaseService.dynamicSort('createdAt'));
        this.scrollToBottomOnInit();
      });
    });
  }

  ngOnInit() {
    this.scrollToBottomOnInit();
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(400);
      }
    }, 500);
  }

  sendMessage() {
    this.message.senderUid = this.currentUser.uid;
    this.message.receiverUid = this.selectedUser.uid;
    this.message.text = this.inputText;
    this.message.senderName = this.currentUser.name;
    this.message.chatId = this.chatId;

    this.firebaseService.insertMessage(this.message)
      .then(() => {
        this.inputText = '';
        this.message = DEFAULT_MESSAGE;
        this.scrollToBottomOnInit();
      });

  }

  openFileChooser() {
    this.options = {
      maximumImagesCount: 1,
      width: 200,
      quality: 50,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      if (results.length > 0)
        this.startUpload(results[0]);
    }, (err) => {
      this.toast.presentErrorToast('Error in selecting image');
      console.log(err.toLocaleString());
    });
  }

  startUpload(file) {

    // The storage path
    const path = `image${new Date().getTime()}.jpg`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);
    let image = 'data:image/jpeg;base64,' + file;
    // The main task
    return new Promise((resolve, reject) => {
      const upload = ref.putString(image, 'data_url');
      const sub = upload.snapshotChanges().pipe(
        finalize(async () => {
          try {
            const photoURL = await ref.getDownloadURL().toPromise();
            this.message.senderUid = this.currentUser.uid;
            this.message.receiverUid = this.selectedUser.uid;
            this.message.text = this.inputText && this.inputText !== '' ? this.inputText : 'File';
            this.message.senderName = this.currentUser.name;
            this.message.chatId = this.chatId;
            this.message.file = photoURL;
            this.firebaseService.insertMessage(this.message)
              .then(() => {
                this.inputText = '';
                this.message.file = null;
                this.scrollToBottomOnInit();
              });

            resolve({photoURL})
          } catch (err) {
            this.inputText = '';
            this.message.file = null;
            reject(err)
          }
          sub.unsubscribe()
        })
      ).subscribe((data) => {
        console.log('storage: ', data)
      })
    })
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
