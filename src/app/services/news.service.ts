import {combineLatest as observableCombineLatest, Observable, from as fromPromise, of} from 'rxjs';
import {Injectable} from '@angular/core';

import {catchError, tap, switchMap, map} from 'rxjs/operators';

import {AngularFireDatabase} from 'angularfire2/database';

import {FileUploadService} from "./file-upload.service";
import {NewsUrl} from "../model/newsUrl";
import {News} from "../model/news.model";
import {MessageService} from "./messages/message.service";

@Injectable()
export class NewsService {
  private newsUrl = NewsUrl.newssUrl;

  constructor(
    private messageService: MessageService,
    private angularFireDatabase: AngularFireDatabase,
    private uploadService: FileUploadService,
  ) {
  }

  /** Log a NewsService message with the MessageService */
  private log(message: string) {
    this.messageService.add('NewsService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getAllNews(): Observable<News[]> {
    return this.angularFireDatabase
      .list<News>('products', (ref) => ref.orderByChild('date'))
      .valueChanges()
      .pipe(map((arr) => arr.reverse()), catchError(this.handleError<News[]>(`getProducts`)));
  }

  public getNewsQuery(
    byChild: string,
    equalTo: string | boolean,
    limitToFirst: number
  ): Observable<News[]> {
    return this.angularFireDatabase
      .list<News>('news', (ref) =>
        ref
          .orderByChild(byChild)
          .equalTo(equalTo)
          .limitToFirst(limitToFirst)
      )
      .valueChanges()
      .pipe(catchError(this.handleError<News[]>(`getNewsQuery`)));
  }

  public findNews(term): Observable<any> {
    return this.angularFireDatabase
      .list<News>('news', (ref) =>
        ref
          .orderByChild('titre')
          .startAt(term)
          .endAt(term + '\uf8ff')
      )
      .valueChanges()
      .pipe(catchError(this.handleError<News[]>(`getNewsQuery`)));
  }

  public getNewsByDate(limitToLast: number): Observable<News[]> {
    return this.angularFireDatabase
      .list<News>('news', (ref) =>
        ref.orderByChild('date').limitToLast(limitToLast)
      )
      .valueChanges()
      .pipe(
        map((arr) => arr.reverse()),
        catchError(this.handleError<News[]>(`getNewsByDate`))
      );
  }


  public getNews(id: any): Observable<News | null> {
    const url = `${this.newsUrl}/${id}`;
    return this.angularFireDatabase
      .object<News>(url)
      .valueChanges()
      .pipe(
        tap((result) => {
          if (result) {
            return of(result);
          } else {
            this.messageService.addError(`Found no Product with id=${id}`);
            return of(null);
          }
        }),
        catchError(this.handleError<News>(`getProduct id=${id}`))
      );
  }


  private updateProductWithoutNewImage(product: News, url: string) {
    const dbOperation = this.angularFireDatabase
      .object<News>(url)
      .update(product)
      .then((response) => {
        this.log(`Updated Product ${product.titre}`);
        return product;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  public addProduct(data: { product: News; }) {
    return this.angularFireDatabase
      .list('products')
      .set(data.product.id.toString(), data.product);
  }


}
