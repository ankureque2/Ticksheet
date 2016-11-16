import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {ConstructionStageHeader} from '../../br.classes/constructionstage';
import {SubLocation} from '../../br.classes/sublocation';
import {Database} from "../../providers/database/database";
import {StagesPage} from "../stages/stages";
import {StagePage} from '../stage/stage';

@Component({
   directives: [StagesPage],
  templateUrl: 'build/pages/plot/plot.html',
})

export class PlotPage implements OnInit {
  stageHeaderPages: StagePage[];
  stageHeaders: ConstructionStageHeader[];
  siteID: number;
  plotID: number;
  plot: SubLocation;

  constructor(private navCtrl: NavController,
              private dataservice: Database,
              public params: NavParams) {
  this.siteID = <number> this.params.get("siteID");
  this.plot = <SubLocation> this.params.get("plot");
  this.plotID = this.plot.RecordID;
  this.getConstructionstages();
  }

  ngOnInit(): void {  
      
  }

  getConstructionstages(): void{
       
        this.dataservice.getConstructionStageHeaders(this.siteID).then((result) => {
           this.stageHeaders =  <ConstructionStageHeader[]> result;
                 
                this.stageHeaderPages = new Array<StagePage>();
                 for (let sh of this.stageHeaders) {
                   let open:boolean = false;
                   if(this.stageHeaders[0] == sh)
                   {
                     open = false;
                   }
                    this.stageHeaderPages.push(new StagePage(sh.Description, sh.RecordID , 'ios-add-circle-outline', open))
                 }
                
          }, (error) => {
                console.log("ERROR: ", error.message);
            });           
  }
}
