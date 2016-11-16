import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import {PlotsService} from '../../providers/plots-service/plots-service';
import {SubLocation} from '../../br.classes/subLocation';
import {ConstructionStage, ConstructionStageHeader} from '../../br.classes/constructionstage'
import {Database} from '../../providers/database/database';
import {PlotPage}  from '../plot/plot';
/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/sublocations/sublocations.html'
})

export class SublocationsPage implements OnInit{
  siteID: number;
  public plots : SubLocation[];
  downloadedPlots: SubLocation[];
  download: any;
constructor(private nav: NavController,
            public params: NavParams,
            private plotservice : PlotsService,
            private dataservice: Database,
            public alrtCrtl: AlertController) {
    
            this.siteID = <number> this.params.get("siteID");
         }  
    
    public ngOnInit() {
        this.populatePlots();
      }

    private populatePlots(): void{
        this.plots = <SubLocation[]> this.plotservice.getPlots(this.siteID); 
      
          this.dataservice.getPlots(this.siteID).then((result) => {
          this.downloadedPlots =  <SubLocation[]> result; 
          this.download = (this.downloadedPlots.length < 1);     
          console.log( this.siteID, this.downloadedPlots.length, this.download);          
          }, (error) => {
                console.log("ERROR: ", error.message);
            });
    }

    downloadSite(): void{

      let StageHeaders = new Array<ConstructionStageHeader>();
      StageHeaders = <ConstructionStageHeader[]> this.plotservice.getConstructionStageHeaders(this.siteID);
        for(let h of StageHeaders) {
          this.dataservice.saveConstructionStageHeader(h.RecordID,h.SiteID,h.Description,h.BuildOrder);      
         }        

        let stages = new Array<ConstructionStage>();
        stages = this.plotservice.getConstructionStages(this.siteID);
        for(let s of stages){
          this.dataservice.saveConstructionStage(s.RecordID,s.ConStageHeaderID,s.Description,s.BuildOrder);      
         }

        for(let p of this.plots){
          this.dataservice.savePlot(p.RecordID,p.SiteID, p.PrimaryName, p.ShortCode,
                                    p.HouseTypeName, p.HouseTypeAltName);                                                 
         }
          this.downloadedPlots = this.plots;
          this.download = (this.downloadedPlots.length < 1);
          let alert = this.alrtCrtl.create({
            title: 'Site',
            subTitle: 'Site Saved',
            buttons: ['OK'] });
           alert.present(alert);
     }

   openPlot(plotID: number, siteID: number){
     let plot = this.plots.find(p=>p.RecordID == plotID);
     this.nav.push(PlotPage,{siteID: siteID, plot: plot})
   }
}