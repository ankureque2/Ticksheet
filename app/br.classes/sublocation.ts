import {ConstructionStage} from './constructionstage';

export class SubLocation  {
    RecordID: number;
    SiteID: number;
    PrimaryName: string; 
    ShortCode: string;
    HouseTypeName: string;
    HouseTypeAltName: string
    constructor( RecordID: number, SiteID: number,
                PrimaryName: string, ShortCode: string,
                HouseTypeName: string, HouseTypeAltName: string){
   
    this.RecordID = RecordID;
    this.SiteID = SiteID ;
    this.PrimaryName = PrimaryName;
    this.ShortCode = ShortCode;
    this.HouseTypeName = HouseTypeName;
    this.HouseTypeAltName = HouseTypeAltName;
  }
}

export class PlotConstructionStage{
    RecordID: number;
    SubLocationID: number;
    ConStageID: number;
    CurrentWorkProgress: number;
    NewWorkProgress: number
    
    constructor(RecordID: number, SubLocationID: number,
                ConStageID: number, CurrentWorkProgress: number,
                NewWorkProgress: number){

              this.RecordID = RecordID;
              this.SubLocationID = SubLocationID;
              this.ConStageID = ConStageID;           
              this.CurrentWorkProgress = CurrentWorkProgress;
              this.NewWorkProgress = NewWorkProgress;
    }
}
    export  class PlotStage {
      PlotID: number;
      ConStageID: number;
      ConStageHeaderID: number
      StageName: string;
      SubLocationConStageID: number
      CurrentWorkProgress: number;
      NewWorkProgress: number
      constructor( PlotID: number, ConStageID: number, conStageHeaderID: number,
                   StageName: string, SubLocationConStageID: number,
                   CurrentWorkProgress: number,   NewWorkProgress: number ){

            this.PlotID = PlotID;
            this.ConStageID = ConStageID;
            this.ConStageHeaderID = conStageHeaderID
            this.StageName = StageName;
            this.CurrentWorkProgress = CurrentWorkProgress;
            this.NewWorkProgress = NewWorkProgress;                   
          }

          static Create(stage: ConstructionStage, plotID: number, stageProgress: PlotConstructionStage) : PlotStage{
              if (stageProgress == undefined){
                   return new PlotStage(plotID, stage.RecordID, stage.ConStageHeaderID,stage.Description, undefined,0,0);
              }
              else{
                    return new PlotStage(plotID, stage.RecordID, stage.ConStageHeaderID,stage.Description, stageProgress.RecordID,
                                         stageProgress.CurrentWorkProgress, stageProgress.NewWorkProgress);
              }            
          
          }

          static CreatePlotStages(stages: ConstructionStage[], plotID: number,stagesProgress: PlotConstructionStage[]) : PlotStage[]{

            let plotStages = new Array<PlotStage>();

              for(let stage of stages){
                let  progress : PlotConstructionStage;
                 if (stagesProgress != undefined){
                   progress = stagesProgress.find(p=>p.ConStageID == stage.RecordID);
                 }
                 if (progress != undefined){
                    plotStages.push(new PlotStage(plotID, stage.RecordID, stage.ConStageHeaderID,stage.Description, 
                                    progress.RecordID,progress.CurrentWorkProgress,progress.NewWorkProgress));
                    } 
                 else {
                        plotStages.push(new PlotStage(plotID, stage.RecordID, stage.ConStageHeaderID, stage.Description, undefined,0,0));
                      }
                   }

            return plotStages;
          }
    }
