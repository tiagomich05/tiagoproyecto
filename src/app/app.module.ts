import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from './modules/shared/shared.module';

//VINCULACIONES/ IMPORTACIONES CON FIREBASE

import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';




@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    //Inicializa firebase en nuestro proyecto

    AngularFireModule.initializeApp(environment.firebaseConfig),

    //autentificacion
    AngularFireAuthModule,
    AngularFireStorageModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
