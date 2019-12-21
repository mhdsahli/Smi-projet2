import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { ElectriqueComponent } from './electrique/electrique.component';
import { ProjetComponent } from './projet/projet.component';
import { MecaniqueComponent } from './mecanique/mecanique.component';
import {AgmCoreModule} from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmDirectionModule } from 'agm-direction'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFirestore} from "@angular/fire/firestore";
import { TopBarComponent } from './top-bar/top-bar.component';
const appRoutes : Routes =[
  {path: '',redirectTo:'accueil', pathMatch:'full'},
  {path : 'accueil', component : AccueilComponent},
  {path : 'entreprise', component : EntrepriseComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'electrique', component : ElectriqueComponent},
  {path : 'mecanique', component : MecaniqueComponent},
  {path : 'projets', component : ProjetComponent},
  {path : 'admin', component : AddEditComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    FooterComponent,
    AccueilComponent,
    ContactComponent,
    ElectriqueComponent,
    ProjetComponent,
    MecaniqueComponent,
    EntrepriseComponent,
    AddEditComponent,
    DropzoneDirective,
    UploadTaskComponent,
    TopBarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AgmDirectionModule,
    RouterModule.forChild(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: "",
      libraries: ["places", "geometry"]
      /* apiKey is required, unless you are a premium customer, in which case you can use clientId */
    }),
    ReactiveFormsModule
  ],
  providers: [AngularFireStorage,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
