import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlotPage} from '../plot/plot';
import {ConstructionStageHeader} from '../../br.classes/constructionstage';
import {Database} from "../../providers/database/database";

/*
  Generated class for the PlotsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [PlotPage],
  templateUrl: 'build/pages/plots/plots.html',
})
export class PlotsPage implements OnInit {
stageHeadersList: ConstructionStageHeader[];

  constructor(private navCtrl: NavController, 
              private dataservice:Database, 
              private siteID: number) {

  }

 ngOnInit(): void {
      this.getSiteHeaders();
}

getSiteHeaders(): void{
       
        this.dataservice.getConstructionStageHeaders(this.siteID).then((result) => {
           this.stageHeadersList =  <ConstructionStageHeader[]> result;
                 
          }, (error) => {
                console.log("ERROR: ", error.message);
            }); 

 }
}
