import { Injectable } from '@angular/core';
import {SQLite} from 'ionic-native';
import {DownloadedSite} from '../../pages/sites/site';
import {ISite} from '../../pages/sites/site';
import {RegistrationInfo} from '../../pages/register/registrationdata';
import {ConstructionStage, ConstructionStageHeader} from '../../br.classes/constructionstage';
import {SubLocation, PlotConstructionStage} from '../../br.classes/sublocation';

import 'rxjs/add/operator/map';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
 
@Injectable()
export class Database {
 
    private storage: SQLite;
    private isOpen: boolean;
    private appDBName: string = "housebuildingdata.db";

    public constructor() {
        if(!this.isOpen) {
            this.storage = new SQLite();
            this.storage.openDatabase({name: this.appDBName, location: "default"}).then(() => {
               
                this.isOpen = true;
            });
        }
    }
 
 public openOrCreateDatabase()  { 
   return boolean =>
   {
    if(!this.isOpen) {
            this.storage = new SQLite();
            /* , iosDatabaseLocation:"Library" use the following location for ios as default is not backup by iCould*/
            this.storage.openDatabase({name: this.appDBName, location: "default"}).then(() => {
                  this.isOpen = true;
                  this.isOpen;
            }, (error) => { this.isOpen = false;
                this.isOpen;
            });
    }
    else{
       this.isOpen; 
    }
   }  
 }

public createRegistrationTable() {
   return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS registration (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                          activationcode INTEGER NOT NULL,
                                                                          housebuildingservername TEXT, 
                                                                          connected INTEGER DEFAULT 0)`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
}

public getActivationInfo() {
    
        return new Promise((resolve, reject) => {
            this.openOrCreateDatabase() ;
            this.createRegistrationTable();
            this.storage.executeSql("SELECT * FROM registration", []).then((data) => {
                var  activationData : RegistrationInfo;
                  if(data.rows.length > 0) {           
                         activationData = new RegistrationInfo(data.rows.item(0).activationcode, data.rows.item(0).connected, data.rows.item(0).housebuildingservername)
                        console.log(data.rows.item(0).activationcode);                 
                }
                resolve(activationData);
            }, (error) => {
                reject(error);
            });
        });
    }
    public saveActivationData(activationcode: string, servername: string, connected: boolean ){
      this.createRegistrationTable();
        return new Promise((resolve, reject)=>{
            this.storage.executeSql(`INSERT INTO registration(activationcode, housebuildingservername, connected)
                                    VALUES(?,?,?)`, [activationcode, servername, connected]).then((data) =>{   

            resolve(data);
        }, (error) => {
            reject(error);
            });
         });
    }

    public deleteActivationRecords(){
        return new Promise((resolve,reject)=>{
            this.storage.executeSql("DELETE FROM registration",[]).then((data)=> {
                resolve(data);
                }, (error)=>{
                    reject(error);
                });
         });
    }

public createSitesTable() {
   return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS sites (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                   primaryname TEXT,
                                                                   shortcode  TEXT,
                                                                   address TEXT,
                                                                   postcode TEXT,
                                                                   telephone TEXT,
                                                                   email TEXT,
                                                                   progressdate TEXT,
                                                                   syncdowndatetime TEXT,
                                                                   modified INTEGER,
                                                                   selected INTEGER DEFAULT 0)`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
}

public getDownloadedSites(){
     this.createSitesTable();
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM sites", []).then((data) => {
                let downloadedSites =  new Array<DownloadedSite>();
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                let savedSite = 
                    new DownloadedSite(data.rows.item(i).recordid,
                                        data.rows.item(i).primaryname,
                                        data.rows.item(i).shortcode,
                                        data.rows.item(i).address,
                                        data.rows.item(i).postcode,
                                        data.rows.item(i).telephone,
                                        data.rows.item(i).email,
                                        data.rows.item(i).progressdate,
                                        data.rows.item(i).syncdowndatetime,
                                        data.rows.item(i).modified,
                                        data.rows.item(i).selected)
                        downloadedSites.push(savedSite);
                    }
                }
                resolve(downloadedSites);
            }, (error) => {
                reject(error);
            });
        });
}

public getSelectedSites(){
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM sites WHERE selected = ?",[true]).then((data) => {
                let downloadedSites =  new Array<DownloadedSite>();
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                let savedSite = 
                    new DownloadedSite(data.rows.item(i).recordid,
                                        data.rows.item(i).primaryname,
                                        data.rows.item(i).shortcode,
                                        data.rows.item(i).address,
                                        data.rows.item(i).postcode,
                                        data.rows.item(i).telephone,
                                        data.rows.item(i).email,
                                        data.rows.item(i).progressdate,
                                        data.rows.item(i).syncdowndatetime,
                                        data.rows.item(i).modified,
                                        data.rows.item(i).selected)
                        downloadedSites.push(savedSite);
                    }
                }
                resolve(downloadedSites);
            }, (error) => {
                reject(error);
            });
        });
}

public getselectedSiteIds(){
    this.createSitesTable();
    return new Promise((resolve,reject)=> {
        this.storage.executeSql("SELECT recordid FROM sites WHERE selected = ?",[true]).then((data)=>{
            let siteIds = [];
            if(data.rows.length >0)
            {
                for(let i = 0; i < data.rows.length; i++) {
                    siteIds.push(data.rows.item(i).recordid);                    
                }
            }
            resolve(siteIds);
            }, (error) => {
                console.log(error.message);
                reject(error);
            });
        });
}


 
public saveSite(site: ISite, selected:boolean)
 {
    var d = new Date();
    var n = d.toISOString();
    this.createSitesTable();
    return  this.saveDownloadedSite(site.RecordID,site.PrimaryName,site.ShortCode,
                              site.Address,site.PostCode,site.Telephone,site.Email,
                              site.ProgressDate, n, false, selected);
}

public changeSiteStatus(recorId: number, selected:boolean)
{
    return new Promise((resolve, reject) => {
        this.storage.executeSql('UPDATE sites SET selected = ? WHERE recordid = ?',[selected, recorId]).then((data)=>{
                resolve(data);
            }, (error)=> {
                reject(error);
            });
    });
}

 public saveDownloadedSite(RecordID: number,
                             PrimaryName: string, ShortCode: string,  
                             Address: string, PostCode: string,  
                             Telephone: string, Email:string,  
                             ProgressDate: string, SyncDownDateTime: string, 
                             Modified: boolean, Selected: boolean) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql(`INSERT OR REPLACE INTO sites (recordid, primaryname,
                                                                   shortcode,
                                                                   address,
                                                                   postcode,
                                                                   telephone,
                                                                   email,
                                                                   progressdate,
                                                                   syncdowndatetime,
                                                                   modified,
                                                                   selected) 
                                                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                                                                   , [RecordID, PrimaryName,ShortCode,
                                                                   Address  , PostCode, Telephone,
                                                                   Email, ProgressDate, SyncDownDateTime,
                                                                   Modified, Selected]).then((data) => {
                 console.log(RecordID + "-saved-" + Selected)                                                      
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

public createSubLoctionTable(){    
 return new Promise((resolve, reject) => {     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS sublocation (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                         siteid INTEGER NOT NULL,
                                                                         primaryname TEXT, 
                                                                         shortcode TEXT,
                                                                         housetypename TEXT,
                                                                         housetypealtname TEXT,
                                                                         FOREIGN KEY (siteid) REFERENCES sites(recordid))`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
 }

public dropSubLoctionTable(){ 
     return new Promise((resolve, reject) => {     
        this.storage.executeSql("DROP TABLE sublocation", []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
}

public getPlots(SiteID: number){
    this.createSubLoctionTable();
      return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM sublocation WHERE siteid = ?", [SiteID]).then((data) => {
                let sublocations =  new Array<SubLocation>();
                if(data.rows.length > 0) {
                 for(let i = 0; i < data.rows.length; i++) {
                  let sublocation = 
                    new SubLocation(data.rows.item(i).recordid,
                                    data.rows.item(i).siteid,
                                    data.rows.item(i).primaryname,
                                    data.rows.item(i).shortcode,
                                    data.rows.item(i).housetypename,
                                    data.rows.item(i).housetypealtanme)
                        sublocations.push(sublocation);
                    }
                }
                resolve(sublocations);
            }, (error) => {
                reject(error);
            });
        });
}
public savePlot(RecordID: number, SiteID: number,
                PrimaryName: string, ShortCode: string,
                HouseTypeName: string, HouseTypeAltName: string) {
        return new Promise((resolve, reject) => {
            this.createSubLoctionTable();
            this.storage.executeSql(`INSERT OR REPLACE INTO sublocation (recordid, siteid,
                                                                   primaryname,
                                                                   shortcode,
                                                                   housetypename,
                                                                   housetypealtname) 
                                                                   VALUES (?, ?, ?, ?,?,?)`
                                                                   , [RecordID, SiteID,PrimaryName,ShortCode, HouseTypeName, HouseTypeAltName]).then((data) => 
            { resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

public createConstructionStageHeaderTable(){
 return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS constageheader (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                            siteid INTEGER NOT NULL,
                                                                            description TEXT, 
                                                                            buildorder INTEGER,
                                                                            FOREIGN KEY (siteid) REFERENCES sites(recordid))`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
 }

public getConstructionStageHeaders(siteId: number){
    this.createConstructionStageHeaderTable();
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM constageheader  WHERE siteid = ? ORDER BY buildorder ASC", [siteId]).then((data) => {
                let stageHeaders =  new Array<ConstructionStageHeader>();
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                let header = 
                    new ConstructionStageHeader(data.rows.item(i).recordid,
                                                data.rows.item(i).siteid,
                                                data.rows.item(i).description,
                                                data.rows.item(i).buildorder)
                        stageHeaders.push(header);
                    }
                }
                resolve(stageHeaders);
            }, (error) => {
                reject(error);
            });
        });
}

 public saveConstructionStageHeader(RecordID: number, SiteID: number,
                Description: string, BuildOrder: number) {
        return new Promise((resolve, reject) => {
            this.createConstructionStageHeaderTable();
            this.storage.executeSql(`INSERT OR REPLACE INTO constageheader (recordid, 
                                                                            siteid,
                                                                            description,
                                                                            buildorder) 
                                                                            VALUES (?, ?, ?, ?)`, 
                                                                          [RecordID, SiteID, Description, BuildOrder]).then((data) => 
            { resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }


public createConstructionStageTable(){
 return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS constage (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                      constageheaderid INTEGER NOT NULL,
                                                                      description TEXT, 
                                                                      buildorder INTEGER,
                                                                      FOREIGN KEY (constageheaderid) REFERENCES constageheader(recordid))`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
 }

public getConstructionStages(constructionStageHeaderID: number){
    this.createConstructionStageTable();
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM constage  WHERE constageheaderid = ? ORDER BY buildorder ASC", [constructionStageHeaderID]).then((data) => {
                let stages =  new Array<ConstructionStage>();
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                let stage = 
                    new ConstructionStage(data.rows.item(i).recordid,
                                                data.rows.item(i).constageheaderid,
                                                data.rows.item(i).description,
                                                data.rows.item(i).buildorder)
                        stages.push(stage);
                    }
                }
                resolve(stages);
            }, (error) => {
                reject(error);
            });
        });
}

public getSiteConstructionStages(siteID: number){
        return new Promise((resolve, reject) => {
            this.storage.executeSql(`SELECT constage.* FROM constage INNER JOIN constageheader ON constage.constageheaderid = constageheader.recordid 
                                        WHERE constageheader.siteid = ? ORDER BY constage.buildorder ASC`, [siteID]).then((data) => {
                let stages =  new Array<ConstructionStage>();
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                let stage = 
                    new ConstructionStage(data.rows.item(i).recordid,
                                                data.rows.item(i).constageheaderid,
                                                data.rows.item(i).description,
                                                data.rows.item(i).buildorder)
                        stages.push(stage);
                    }
                }
                resolve(stages);
            }, (error) => {
                reject(error);
            });
        });
}


 public saveConstructionStage(RecordID: number, ConstageHeaderID: number,
                Description: string, BuildOrder: number) {
        return new Promise((resolve, reject) => {
            this.createConstructionStageTable();
            this.storage.executeSql(`INSERT OR REPLACE INTO constage (recordid, 
                                                                      constageheaderid,
                                                                      description,
                                                                      buildorder) 
                                                                      VALUES (?, ?, ?, ?)`, 
                                                                      [RecordID, ConstageHeaderID, Description, BuildOrder]).then((data) => 
            { resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

public createSubLocationConstructionStageTable(){
 return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS sublocationconstage (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                                 sublocationid INTEGER NOT NULL,
                                                                                 constageid INTEGER NOT NULL,                                                                                 
                                                                                 currentworkprogress INTEGER,
                                                                                 newworkprogress INTEGER,
                                                                                 FOREIGN KEY (sublocationid) REFERENCES sublocation(recordid),
                                                                                 FOREIGN KEY (constageid) REFERENCES constage(recordid))`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
 }

 public savePlotConstructionStage(RecordID: number, SubLocationID: number,
                                  ConStageID: number, CurrentWorkProgress: number,
                                  NewWorkProgress: number) {
        this.createSubLocationConstructionStageTable();
        return new Promise((resolve, reject) => {
            this.storage.executeSql(`INSERT OR REPLACE INTO sublocationconstage (recordid, 
                                                                                sublocationid,
                                                                                constageid,                                                                               
                                                                                currentworkprogress,
                                                                                newworkprogress) 
                                                                                VALUES (?, ?, ?, ?, ?)`, 
                                                                                [RecordID, SubLocationID, ConStageID, 
                                                                                CurrentWorkProgress,NewWorkProgress]).then((data) => 
            { resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

 public createSubLocationConstructionStageAttachmentTable(){
 return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS attachments (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                         sublocationconstageid INTEGER NOT NULL,
                                                                         picturelocation   TEXT,                                                                        
                                                                         FOREIGN KEY (sublocationconstageid) REFERENCES sublocationconstage(recordid))`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });

 }

  public savePlotConstructionStageAttachments(RecordID: number, 
                                             SublocationConStageID: number,
                                             Photo : string) {
        this.createSubLocationConstructionStageAttachmentTable();
        return new Promise((resolve, reject) => {
            this.storage.executeSql(`INSERT OR REPLACE INTO attachments (recordid, 
                                                                         sublocationconstageid,
                                                                         picturelocation) 
                                                                         VALUES (?, ?, ?)`, 
                                                                         [RecordID, SublocationConStageID, Photo]).then((data) => 
            { resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

public createSubLocationConstructionStageNotesTable(){
 return new Promise((resolve, reject) => {
     
        this.storage.executeSql(`CREATE TABLE IF NOT EXISTS notes (recordid INTEGER PRIMARY KEY  NOT NULL,
                                                                   sublocationconstageid INTEGER NOT NULL,
                                                                   notes TEXT,
                                                                   notedatetime TEXT,                                                                        
                                                                   FOREIGN KEY (sublocationconstageid) REFERENCES sublocationconstage(recordid))`, []).then((data) => 
        {resolve(data);
       },
       (error) => {
           reject(error);
           });
   });
 }

 public savPlotConstructionStageNotes(RecordID: number, 
                                      SublocationConStageID: number,
                                      Notes : string,
                                      NotesDateTime: string) {

        this.createSubLocationConstructionStageNotesTable();
        return new Promise((resolve, reject) => {
            this.storage.executeSql(`INSERT OR REPLACE INTO notes (recordid, 
                                                                   sublocationid,
                                                                   notes,
                                                                   notedatetime) 
                                                                   VALUES (?, ?, ?)`, 
                                                                 [RecordID, SublocationConStageID, Notes, NotesDateTime]).then((data) => 
            { resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }
}