import { Injectable } from '@angular/core';

//import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  //fileTransfer: FileTransferObject;
  constructor(
    private fileOpener: FileOpener,
    //private transfer: FileTransfer,
    private file: File
  ) { }

  download(url: string, title: string) {
    // this.fileTransfer = this.transfer.create();
    // this.fileTransfer
    //   .download(url, this.file.dataDirectory + title + ".pdf")
    //   .then(entry => {
    //     console.log("download complete: " + entry.toURL());
    //     this.fileOpener
    //       .open(entry.toURL(), "application/pdf")
    //       .then(() => console.log("File is opened"))
    //       .catch(e => console.log("Error opening file", e));
    //   });
  }
}
