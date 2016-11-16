"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var site_1 = require('../../pages/sites/site');
var registrationdata_1 = require('../../pages/register/registrationdata');
var constructionstage_1 = require('../../br.classes/constructionstage');
var sublocation_1 = require('../../br.classes/sublocation');
require('rxjs/add/operator/map');
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Database = (function () {
    function Database() {
        var _this = this;
        this.appDBName = "housebuildingdata.db";
        if (!this.isOpen) {
            this.storage = new ionic_native_1.SQLite();
            this.storage.openDatabase({ name: this.appDBName, location: "default" }).then(function () {
                _this.isOpen = true;
            });
        }
    }
    Database.prototype.openOrCreateDatabase = function () {
        var _this = this;
        return function (boolean) {
            if (!_this.isOpen) {
                _this.storage = new ionic_native_1.SQLite();
                /* , iosDatabaseLocation:"Library" use the following location for ios as default is not backup by iCould*/
                _this.storage.openDatabase({ name: _this.appDBName, location: "default" }).then(function () {
                    _this.isOpen = true;
                    _this.isOpen;
                }, function (error) {
                    _this.isOpen = false;
                    _this.isOpen;
                });
            }
            else {
                _this.isOpen;
            }
        };
    };
    Database.prototype.createRegistrationTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS registration (id INTEGER PRIMARY KEY AUTOINCREMENT,\n                                                                          activationcode INTEGER NOT NULL,\n                                                                          housebuildingservername TEXT, \n                                                                          connected INTEGER DEFAULT 0)", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getActivationInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.openOrCreateDatabase();
            _this.createRegistrationTable();
            _this.storage.executeSql("SELECT * FROM registration", []).then(function (data) {
                var activationData;
                if (data.rows.length > 0) {
                    activationData = new registrationdata_1.RegistrationInfo(data.rows.item(0).activationcode, data.rows.item(0).connected, data.rows.item(0).housebuildingservername);
                    console.log(data.rows.item(0).activationcode);
                }
                resolve(activationData);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.saveActivationData = function (activationcode, servername, connected) {
        var _this = this;
        this.createRegistrationTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("INSERT INTO registration(activationcode, housebuildingservername, connected)\n                                    VALUES(?,?,?)", [activationcode, servername, connected]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.deleteActivationRecords = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("DELETE FROM registration", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createSitesTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS sites (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                   primaryname TEXT,\n                                                                   shortcode  TEXT,\n                                                                   address TEXT,\n                                                                   postcode TEXT,\n                                                                   telephone TEXT,\n                                                                   email TEXT,\n                                                                   progressdate TEXT,\n                                                                   syncdowndatetime TEXT,\n                                                                   modified INTEGER,\n                                                                   selected INTEGER DEFAULT 0)", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getDownloadedSites = function () {
        var _this = this;
        this.createSitesTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT * FROM sites", []).then(function (data) {
                var downloadedSites = new Array();
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var savedSite = new site_1.DownloadedSite(data.rows.item(i).recordid, data.rows.item(i).primaryname, data.rows.item(i).shortcode, data.rows.item(i).address, data.rows.item(i).postcode, data.rows.item(i).telephone, data.rows.item(i).email, data.rows.item(i).progressdate, data.rows.item(i).syncdowndatetime, data.rows.item(i).modified, data.rows.item(i).selected);
                        downloadedSites.push(savedSite);
                    }
                }
                resolve(downloadedSites);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getSelectedSites = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT * FROM sites WHERE selected = ?", [true]).then(function (data) {
                var downloadedSites = new Array();
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var savedSite = new site_1.DownloadedSite(data.rows.item(i).recordid, data.rows.item(i).primaryname, data.rows.item(i).shortcode, data.rows.item(i).address, data.rows.item(i).postcode, data.rows.item(i).telephone, data.rows.item(i).email, data.rows.item(i).progressdate, data.rows.item(i).syncdowndatetime, data.rows.item(i).modified, data.rows.item(i).selected);
                        downloadedSites.push(savedSite);
                    }
                }
                resolve(downloadedSites);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getselectedSiteIds = function () {
        var _this = this;
        this.createSitesTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT recordid FROM sites WHERE selected = ?", [true]).then(function (data) {
                var siteIds = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        siteIds.push(data.rows.item(i).recordid);
                    }
                }
                resolve(siteIds);
            }, function (error) {
                console.log(error.message);
                reject(error);
            });
        });
    };
    Database.prototype.saveSite = function (site, selected) {
        var d = new Date();
        var n = d.toISOString();
        this.createSitesTable();
        return this.saveDownloadedSite(site.RecordID, site.PrimaryName, site.ShortCode, site.Address, site.PostCode, site.Telephone, site.Email, site.ProgressDate, n, false, selected);
    };
    Database.prototype.changeSiteStatus = function (recorId, selected) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql('UPDATE sites SET selected = ? WHERE recordid = ?', [selected, recorId]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.saveDownloadedSite = function (RecordID, PrimaryName, ShortCode, Address, PostCode, Telephone, Email, ProgressDate, SyncDownDateTime, Modified, Selected) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("INSERT OR REPLACE INTO sites (recordid, primaryname,\n                                                                   shortcode,\n                                                                   address,\n                                                                   postcode,\n                                                                   telephone,\n                                                                   email,\n                                                                   progressdate,\n                                                                   syncdowndatetime,\n                                                                   modified,\n                                                                   selected) \n                                                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [RecordID, PrimaryName, ShortCode,
                Address, PostCode, Telephone,
                Email, ProgressDate, SyncDownDateTime,
                Modified, Selected]).then(function (data) {
                console.log(RecordID + "-saved-" + Selected);
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createSubLoctionTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS sublocation (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                         siteid INTEGER NOT NULL,\n                                                                         primaryname TEXT, \n                                                                         shortcode TEXT,\n                                                                         housetypename TEXT,\n                                                                         housetypealtname TEXT,\n                                                                         FOREIGN KEY (siteid) REFERENCES sites(recordid))", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.dropSubLoctionTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("DROP TABLE sublocation", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getPlots = function (SiteID) {
        var _this = this;
        this.createSubLoctionTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT * FROM sublocation WHERE siteid = ?", [SiteID]).then(function (data) {
                var sublocations = new Array();
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var sublocation = new sublocation_1.SubLocation(data.rows.item(i).recordid, data.rows.item(i).siteid, data.rows.item(i).primaryname, data.rows.item(i).shortcode, data.rows.item(i).housetypename, data.rows.item(i).housetypealtanme);
                        sublocations.push(sublocation);
                    }
                }
                resolve(sublocations);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.savePlot = function (RecordID, SiteID, PrimaryName, ShortCode, HouseTypeName, HouseTypeAltName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createSubLoctionTable();
            _this.storage.executeSql("INSERT OR REPLACE INTO sublocation (recordid, siteid,\n                                                                   primaryname,\n                                                                   shortcode,\n                                                                   housetypename,\n                                                                   housetypealtname) \n                                                                   VALUES (?, ?, ?, ?,?,?)", [RecordID, SiteID, PrimaryName, ShortCode, HouseTypeName, HouseTypeAltName]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createConstructionStageHeaderTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS constageheader (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                            siteid INTEGER NOT NULL,\n                                                                            description TEXT, \n                                                                            buildorder INTEGER,\n                                                                            FOREIGN KEY (siteid) REFERENCES sites(recordid))", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getConstructionStageHeaders = function (siteId) {
        var _this = this;
        this.createConstructionStageHeaderTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT * FROM constageheader  WHERE siteid = ? ORDER BY buildorder ASC", [siteId]).then(function (data) {
                var stageHeaders = new Array();
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var header = new constructionstage_1.ConstructionStageHeader(data.rows.item(i).recordid, data.rows.item(i).siteid, data.rows.item(i).description, data.rows.item(i).buildorder);
                        stageHeaders.push(header);
                    }
                }
                resolve(stageHeaders);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.saveConstructionStageHeader = function (RecordID, SiteID, Description, BuildOrder) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createConstructionStageHeaderTable();
            _this.storage.executeSql("INSERT OR REPLACE INTO constageheader (recordid, \n                                                                            siteid,\n                                                                            description,\n                                                                            buildorder) \n                                                                            VALUES (?, ?, ?, ?)", [RecordID, SiteID, Description, BuildOrder]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createConstructionStageTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS constage (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                      constageheaderid INTEGER NOT NULL,\n                                                                      description TEXT, \n                                                                      buildorder INTEGER,\n                                                                      FOREIGN KEY (constageheaderid) REFERENCES constageheader(recordid))", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getConstructionStages = function (constructionStageHeaderID) {
        var _this = this;
        this.createConstructionStageTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT * FROM constage  WHERE constageheaderid = ? ORDER BY buildorder ASC", [constructionStageHeaderID]).then(function (data) {
                var stages = new Array();
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var stage = new constructionstage_1.ConstructionStage(data.rows.item(i).recordid, data.rows.item(i).constageheaderid, data.rows.item(i).description, data.rows.item(i).buildorder);
                        stages.push(stage);
                    }
                }
                resolve(stages);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.getSiteConstructionStages = function (siteID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("SELECT constage.* FROM constage INNER JOIN constageheader ON constage.constageheaderid = constageheader.recordid \n                                        WHERE constageheader.siteid = ? ORDER BY constage.buildorder ASC", [siteID]).then(function (data) {
                var stages = new Array();
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var stage = new constructionstage_1.ConstructionStage(data.rows.item(i).recordid, data.rows.item(i).constageheaderid, data.rows.item(i).description, data.rows.item(i).buildorder);
                        stages.push(stage);
                    }
                }
                resolve(stages);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.saveConstructionStage = function (RecordID, ConstageHeaderID, Description, BuildOrder) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.createConstructionStageTable();
            _this.storage.executeSql("INSERT OR REPLACE INTO constage (recordid, \n                                                                      constageheaderid,\n                                                                      description,\n                                                                      buildorder) \n                                                                      VALUES (?, ?, ?, ?)", [RecordID, ConstageHeaderID, Description, BuildOrder]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createSubLocationConstructionStageTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS sublocationconstage (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                                 sublocationid INTEGER NOT NULL,\n                                                                                 constageid INTEGER NOT NULL,                                                                                 \n                                                                                 currentworkprogress INTEGER,\n                                                                                 newworkprogress INTEGER,\n                                                                                 FOREIGN KEY (sublocationid) REFERENCES sublocation(recordid),\n                                                                                 FOREIGN KEY (constageid) REFERENCES constage(recordid))", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.savePlotConstructionStage = function (RecordID, SubLocationID, ConStageID, CurrentWorkProgress, NewWorkProgress) {
        var _this = this;
        this.createSubLocationConstructionStageTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("INSERT OR REPLACE INTO sublocationconstage (recordid, \n                                                                                sublocationid,\n                                                                                constageid,                                                                               \n                                                                                currentworkprogress,\n                                                                                newworkprogress) \n                                                                                VALUES (?, ?, ?, ?, ?)", [RecordID, SubLocationID, ConStageID,
                CurrentWorkProgress, NewWorkProgress]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createSubLocationConstructionStageAttachmentTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS attachments (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                         sublocationconstageid INTEGER NOT NULL,\n                                                                         picturelocation   TEXT,                                                                        \n                                                                         FOREIGN KEY (sublocationconstageid) REFERENCES sublocationconstage(recordid))", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.savePlotConstructionStageAttachments = function (RecordID, SublocationConStageID, Photo) {
        var _this = this;
        this.createSubLocationConstructionStageAttachmentTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("INSERT OR REPLACE INTO attachments (recordid, \n                                                                         sublocationconstageid,\n                                                                         picturelocation) \n                                                                         VALUES (?, ?, ?)", [RecordID, SublocationConStageID, Photo]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.createSubLocationConstructionStageNotesTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("CREATE TABLE IF NOT EXISTS notes (recordid INTEGER PRIMARY KEY  NOT NULL,\n                                                                   sublocationconstageid INTEGER NOT NULL,\n                                                                   notes TEXT,\n                                                                   notedatetime TEXT,                                                                        \n                                                                   FOREIGN KEY (sublocationconstageid) REFERENCES sublocationconstage(recordid))", []).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.savPlotConstructionStageNotes = function (RecordID, SublocationConStageID, Notes, NotesDateTime) {
        var _this = this;
        this.createSubLocationConstructionStageNotesTable();
        return new Promise(function (resolve, reject) {
            _this.storage.executeSql("INSERT OR REPLACE INTO notes (recordid, \n                                                                   sublocationid,\n                                                                   notes,\n                                                                   notedatetime) \n                                                                   VALUES (?, ?, ?)", [RecordID, SublocationConStageID, Notes, NotesDateTime]).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Database);
    return Database;
}());
exports.Database = Database;
