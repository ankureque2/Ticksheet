import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SubLocation} from  '../../br.classes/sublocation';
import {ConstructionStageHeader} from  '../../br.classes/constructionstage';
import {ConstructionStage} from  '../../br.classes/constructionstage';
  
@Injectable()
export class PlotsService {

/*  constructor(private http: Http) {} */

getConstructionStageHeaders(SiteId: number): ConstructionStageHeader[]
{
 
  let stageHeaders = new Array<ConstructionStageHeader>();
  let h1 = new ConstructionStageHeader(1, SiteId, "FOUNDATIONS", 1);
  let h2 = new ConstructionStageHeader(2, SiteId, "BRICKWORK", 2);
  let h3 = new ConstructionStageHeader(3, SiteId,"ROOFING",3);
  let h4 = new ConstructionStageHeader(4, SiteId, "CARPENTER",4);
  let h5 = new ConstructionStageHeader(5, SiteId,"ELECTRICAL",5);
  let h6 = new ConstructionStageHeader(6, SiteId,"PLUMBING",6);
  let h7 = new ConstructionStageHeader(7, SiteId,"HEATING",7);

  stageHeaders.push(h1);
  stageHeaders.push(h2);
  stageHeaders.push(h3);
  stageHeaders.push(h4);
  stageHeaders.push(h5);
  stageHeaders.push(h6);

  return stageHeaders;
}

getConstructionStages(SiteId: number): ConstructionStage[]
{
 
  let stages: ConstructionStage[];
  let s1 = new ConstructionStage(1, 1, "Block & Beam Floor & Oversite", 1);
  let s2 = new ConstructionStage(2, 1, "Clear Around Plot", 2);
  let s3 = new ConstructionStage(3,1,"Floor Slab",3);
  let s4 = new ConstructionStage(4,1, "Excavate & Concrete Foundation",4);
  let s5 = new ConstructionStage(5,2,"Underbuilding Blockwork",5);
  let s6 = new ConstructionStage(6,2,"First Lift Brickwork Traditional",6);
  let s7 = new ConstructionStage(7,2,"Second Lift Brickwork Traditional",7);
  let s8 = new ConstructionStage(8,2,"Third Lift Brickwork Traditional",8);
  let s9 = new ConstructionStage(9,3,"Roof Covering Layer One",9);
  let s10 = new ConstructionStage(10,3,"Roof Covering Layer two",10);
  
  return [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10];
}

  getPlots(SiteId: number){
  let Plots: SubLocation[];
  let p1 = new SubLocation(1,SiteId,"Plot1","P1", "Lowther Model BX","NNLowther BX");
  let p2 = new SubLocation(2,SiteId,"Plot2","P2", "Lewis Model B","NLewisB");
  let p3 = new SubLocation(3,SiteId,"Plot3","P3", "MacRae Model BX","NMacrae BX");
  let p4 = new SubLocation(4,SiteId,"Plot4","P4", "Arthur Model BX","NArthur");
  let p5 = new SubLocation(5,SiteId,"Plot5","P5", "LRanald Model Bx","RAN BX");
  let p6 = new SubLocation(6,SiteId,"Plot6","P6", "Laird Model B","NLairdB");

  return [p1,p2,p3,p4,p5,p6];
  }

}

