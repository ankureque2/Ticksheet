import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {OnInit} from '@angular/core';
import {DownloadedSite} from "../site";
/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/sites/details/details.html',
})
export class DetailsPage {
selectedSite : DownloadedSite;

  constructor( public platform: Platform,
               public params: NavParams,
               public viewCtrl: ViewController) {
    
    this.selectedSite = <DownloadedSite> this.params.get("selected");
    }

dismiss() {
    this.viewCtrl.dismiss();
  }
}
