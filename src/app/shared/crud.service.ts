import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/database";
import {News} from "../model/news.model";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  allNewsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  newsRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  constructor(private db: AngularFireDatabase) { }

  // Create Student
  addNews(news: News) {
    this.allNewsRef.push({
      titre: news.titre,
      description: news.description,
      date: news.date,
      id: news.id
    })
  }
  // Fetch Single Student Object
  getNews(id: string) {
    this.newsRef = this.db.object('news/' + id);
    return this.newsRef;
  }

  // Fetch Students List
  getAllNews() {
    this.allNewsRef = this.db.list('news');
    return this.allNewsRef;
  }
  public addProduct(data: { news: News; }) {
    return this.db
      .list('news')
      .set(data.news.id.toString(), data.news);
  }
}
