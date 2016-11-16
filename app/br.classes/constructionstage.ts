export class ConstructionStageHeader  {
    RecordID: number;
    SiteID: number;
    Description: string; 
    BuildOrder: number;
       
    constructor( RecordID: number, SiteID: number,
                Description: string, BuildOrder: number){
   
    this.RecordID = RecordID;
    this.SiteID = SiteID ;
    this.Description = Description;
    this.BuildOrder = BuildOrder;
  }
}

export class ConstructionStage {
    RecordID: number;
    ConStageHeaderID: number;
    Description: string; 
    BuildOrder: number;
       
    constructor(RecordID: number, ConStageHeaderID: number,
                Description: string, BuildOrder: number){
   
    this.RecordID = RecordID;
    this.ConStageHeaderID = ConStageHeaderID ;
    this.Description = Description;
    this.BuildOrder = BuildOrder;
  }
}