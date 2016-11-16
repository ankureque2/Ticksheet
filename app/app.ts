import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import {enableProdMode} from '@angular/core';
import { Register } from './pages/register/register';
import {RegistrationInfo} from './pages/register/registrationdata';
import { Sites } from './pages/sites/sites';
import {SitesService} from './pages/sites/sites.service';
import {Database} from './providers/database/database';
import {StatusBar, SQLite} from 'ionic-native';
import {PlotsService} from './providers/plots-service/plots-service';
@Component({
  templateUrl: 'build/app.html',
  providers: [SitesService, PlotsService, Database],
  
})
class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Registration', component: Register },
      { title: 'Sites', component: Sites }
    ];               
        this.rootPage = Register;       
   });
  }

 appRegistered(): boolean {
   let registered: boolean = false;
   let dataservice = new Database();
   dataservice.getActivationInfo().then((result) => {
      let r =  <RegistrationInfo> result;    
        if (r !== undefined && r.activationCode !== undefined && r.activationCode !== '') {
            alert(r.activationCode);
            registered = true;
        } else{
               registered = false;
        }      
          }, (error) => {
                console.log("ERROR: ", error.message);
                registered = false;
            }); 

            return registered;   
 }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
