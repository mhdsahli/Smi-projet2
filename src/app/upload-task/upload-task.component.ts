import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {finalize, tap} from "rxjs/operators";
import {log} from "util";

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;

  @Output()
  public onNewEntryAdded = new EventEmitter();

  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.startUpload();
  }

  addNewEntry(): void {

    this.onNewEntryAdded.emit({
      value: this.downloadURL

    })
    console.log(this.downloadURL)
  }

  startUpload() {

    // The storage path
    const path = 'news/'+Date.now().toString();

    // Reference to storagJane bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.addNewEntry();
        this.db.collection('files').add({downloadURL: this.downloadURL, path});
      }),
    );

  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
