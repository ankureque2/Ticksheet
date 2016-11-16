import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the NotesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/notes/notes.html',
})
export class NotesPage {

  constructor(public modalCtrl: ModalController,
               public params: NavParams,
               public viewCtrl: ViewController) {
    

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
