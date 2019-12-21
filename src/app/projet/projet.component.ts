import {Component, OnInit} from '@angular/core';
import {News} from "../model/news.model";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseListObservable} from "@angular/fire/database-deprecated";
import {ToastrService} from "ngx-toastr";
import {CrudService} from "../shared/crud.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  newsList: News[];
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)


  constructor(public crudApi: CrudService // Toastr service for alert message
  ) {

  }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.getAllNews();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.newsList = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.newsList.push(a as News);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {
    this.crudApi.getAllNews().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }
}
