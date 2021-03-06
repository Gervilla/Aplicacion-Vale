import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
//import { SafePipe } from './pipe/safe.pipe';

var firebaseConfig = {
  apiKey: "AIzaSyBjJJXR29J7BXXvCEYZFibSh_VvYbbR_88",
  authDomain: "valeapp-d1422.firebaseapp.com",
  databaseURL: "https://valeapp-d1422-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "valeapp-d1422",
  storageBucket: "valeapp-d1422.appspot.com",
  messagingSenderId: "263170578959",
  appId: "1:263170578959:web:46298a4f57d3557ce0a17a"
};



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
