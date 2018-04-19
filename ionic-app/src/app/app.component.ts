import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import firebaseConfig from './firebase-config';
import * as firebase from 'firebase';
import {FCM} from '@ionic-native/fcm'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private fcm:FCM) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.notificationWEB();
    this.platform.ready().then(() => {
        this.notificationMobile();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //somente para WEB ou -----PWA
  notificationWEB(){
      if(document.URL.startsWith('http')){
          const firebaseApp = firebase.initializeApp(firebaseConfig);
          const messaging = firebaseApp.messaging();
          navigator.serviceWorker.register('service-worker.js')
              .then((registration) => {
                  messaging.useServiceWorker(registration);
                  messaging.requestPermission()
                      .then(function(){
                          console.log('Permissão concedida');
                          //setTimeout(() => {
                          messaging.getToken()
                              .then(function(token){
                                  console.log('token do device',token);
                              }, function(error){
                                  console.log(error);
                              });
                          //},2000);

                      });
                  messaging.onMessage(function(payload){
                      alert('Mensagem recebida');
                      console.log(payload);
                  });
              });
      }


  }

  notificationMobile(){
      if(this.platform.is('android') || this.platform.is('ios')){
          this.fcm.getToken().then((token) => console.log(token));

          this.fcm.onNotification().subscribe(data => {
              //this.nav.setRoot()
          })
      }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
