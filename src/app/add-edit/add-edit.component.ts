import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {News} from "../model/news.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {NewsService} from "../services/news.service";
import {MessageService} from "../services/messages/message.service";
import {CrudService} from "../shared/crud.service";
import {addParseSpanInfo} from "@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/storage";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public newsForm: FormGroup;
  public news: News;
  private newsSubscription: Subscription;
  private formSubscription: Subscription;
  public id;
  public mode: 'edit' | 'add';
  isHovering: boolean;

  files: File[] = [];

  constructor(
    public crudApi: CrudService
  ) {

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  ngOnInit() {
    this.initForm()
  }


  private initForm() {
    this.newsForm = new FormGroup({
      titre: new FormControl(
        this.news && this.news.titre,
        Validators.required
      ),
      description: new FormControl(
        this.news && this.news.description,
        Validators.required
      ),
      id: new FormControl(
        {
          value: this.news && this.news.id,
          disabled: true
        },
        [Validators.required, Validators.min(0)]
      ),
      date: new FormControl(
        this.news && this.news.date,
        Validators.required
      )
    });
    this.onFormChanges();
  }

  private onFormChanges() {
    this.formSubscription = this.newsForm.valueChanges.subscribe(
      (formFieldValues) => {
        const news = {...this.news, ...formFieldValues};

      }
    );
  }

  public onSubmit() {
    this.syncNews({...this.news, ...this.newsForm.value});
    console.log(this.newsForm.value);
    console.log("*********////*"+this.news.imageUrl);
    const newsToSubmit = this.constructProductToSubmit(this.news);

    this.addNews(newsToSubmit);
    this.newsForm.reset();
  }

  addNewEntry(event) {

    this.syncNews({...this.news, ...this.newsForm.value});
    this.news.imageUrl = event.value;

    console.log("**************00"+ event.value)
    console.log("**************00"+this.news.imageUrl)
  }

  private addNews(news: News) {
    this.crudApi.addProduct({news});
  }

  private syncNews(news): void {
    const id = this.createId(news);
    this.news = {
      ...news,
      id
    };
  }

  private createId(news: News): number {
    const randomId = Math.floor(Math.random() * new Date().getTime());
    let id = news.id || randomId;
    if (id === 1) {
      id = randomId;
    }
    return id;
  }

  private constructProductToSubmit(product: News): News {
    return {
      ...product

    };
  }

  /*
 private setProduct() {
   this.route.params.subscribe((params: Params) => {
     this.id = +this.route.snapshot.paramMap.get('id');
     // if we have an id, we're in edit mode
     if (this.id) {
       this.mode = 'edit';
       this.getProduct(this.id);
       this.initForm();
     } else {
       // else we are in add mode
       this.mode = 'add';
       this.constructProduct();
       this.initForm();
     }
   });
 }
 public onSubmit() {
   this.syncNews({ ...this.news, ...this.newsForm.value });
   console.log(this.newsForm.value);
   const productToSubmit = this.constructProductToSubmit(this.news);
   if (this.mode === 'add' ) {
     this.addProduct(productToSubmit);
   } else if (this.mode === 'edit') {

   } else {
     this.log.addError('Please provide a file for your product');
     return;
   }
 }
 private addProduct(product: News) {
   this.productService.addProduct({ product });
 }



 // pure helper functions start here:
 private constructMockNews() {
   return new News(null,null ,null ,null)

 }
 private constructProduct() {
   const product = this.constructMockNews();

   this.syncNews(product);
   this.initForm();
 }
 private getProduct(id): void {
   this.newsSubscription = this.productService
     .getNews(id)
     .subscribe((news) => {
       if (news) {
         this.syncNews(news);
         this.initForm();
       }
     });
 }*/
}
