import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConstructionStage} from '../../br.classes/constructionstage'

/*
  Generated class for the StagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
   selector: 'header',
  templateUrl: 'build/pages/stage/stage.html',
})
export class StagePage {

  constructor(public title: string, public stageID: number, public icon: string, public showDetails: boolean) {

  }

}
