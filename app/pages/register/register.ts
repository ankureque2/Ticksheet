import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Database} from "../../providers/database/database";
import {RegistrationInfo} from './registrationdata';
import {Sites} from '../sites/sites'
@Component({
  templateUrl: 'build/pages/register/register.html'
})
export class Register implements OnInit{
 activecode: string;
 connected: boolean;
  constructor(private navCtrl: NavController, private dataservice : Database, public alrtCrtl: AlertController) {
 
  }

   public ngOnInit() {
        this.populateRegistrionNo();
    }

   populateRegistrionNo(){
        this.connected = false;
      this.dataservice.getActivationInfo().then((result) => {
        let activationData = <RegistrationInfo> result;
                this.activecode = activationData.activationCode;
                this.connected = activationData.connected;
                alert(activationData.activationCode);
            }, (error) => {
                console.log("ERROR: ", error.message);
            });
  }
  
  registerApp() {
      alert(this.activecode);
   this.dataservice.saveActivationData(this.activecode,"HousebuildTestServer", true).then((result) => {
        let alert = this.alrtCrtl.create({
            title: 'Registration',
            subTitle: 'Registration Complete',
            buttons: ['OK'] });
         alert.present(alert);
       
            console.log("Activated");
        }, (error) => {
            console.log("ERROR: ", error.message);
            let alert = this.alrtCrtl.create({
                title: 'Registration',
                subTitle: error.message,
                buttons: ['Dismiss'] });
       alert.present(alert);      
    });    
  }

deregister(){
this.dataservice.deleteActivationRecords().then((result)=>
{
  let alert = this.alrtCrtl.create({
            title: 'Registration',
            subTitle: 'you have degistered',
            buttons: ['OK'] });
           alert.present(alert);
            console.log("DeActivated");
        }, (error) => {
            console.log("ERROR: ", error.message);
            let alert = this.alrtCrtl.create({
                title: 'Registration',
                subTitle: error.message,
                buttons: ['Dismiss'] });
       alert.present(alert);
    });  
    window.location.reload(true);
    
}

  gotoSitesPage(){
        this.navCtrl.setRoot(Sites);
               
  }
}
