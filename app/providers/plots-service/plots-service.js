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
require('rxjs/add/operator/map');
var sublocation_1 = require('../../br.classes/sublocation');
var constructionstage_1 = require('../../br.classes/constructionstage');
var constructionstage_2 = require('../../br.classes/constructionstage');
var PlotsService = (function () {
    function PlotsService() {
    }
    /*  constructor(private http: Http) {} */
    PlotsService.prototype.getConstructionStageHeaders = function (SiteId) {
        var stageHeaders = new Array();
        var h1 = new constructionstage_1.ConstructionStageHeader(1, SiteId, "FOUNDATIONS", 1);
        var h2 = new constructionstage_1.ConstructionStageHeader(2, SiteId, "BRICKWORK", 2);
        var h3 = new constructionstage_1.ConstructionStageHeader(3, SiteId, "ROOFING", 3);
        var h4 = new constructionstage_1.ConstructionStageHeader(4, SiteId, "CARPENTER", 4);
        var h5 = new constructionstage_1.ConstructionStageHeader(5, SiteId, "ELECTRICAL", 5);
        var h6 = new constructionstage_1.ConstructionStageHeader(6, SiteId, "PLUMBING", 6);
        var h7 = new constructionstage_1.ConstructionStageHeader(7, SiteId, "HEATING", 7);
        stageHeaders.push(h1);
        stageHeaders.push(h2);
        stageHeaders.push(h3);
        stageHeaders.push(h4);
        stageHeaders.push(h5);
        stageHeaders.push(h6);
        return stageHeaders;
    };
    PlotsService.prototype.getConstructionStages = function (SiteId) {
        var stages;
        var s1 = new constructionstage_2.ConstructionStage(1, 1, "Block & Beam Floor & Oversite", 1);
        var s2 = new constructionstage_2.ConstructionStage(2, 1, "Clear Around Plot", 2);
        var s3 = new constructionstage_2.ConstructionStage(3, 1, "Floor Slab", 3);
        var s4 = new constructionstage_2.ConstructionStage(4, 1, "Excavate & Concrete Foundation", 4);
        var s5 = new constructionstage_2.ConstructionStage(5, 2, "Underbuilding Blockwork", 5);
        var s6 = new constructionstage_2.ConstructionStage(6, 2, "First Lift Brickwork Traditional", 6);
        var s7 = new constructionstage_2.ConstructionStage(7, 2, "Second Lift Brickwork Traditional", 7);
        var s8 = new constructionstage_2.ConstructionStage(8, 2, "Third Lift Brickwork Traditional", 8);
        var s9 = new constructionstage_2.ConstructionStage(9, 3, "Roof Covering Layer One", 9);
        var s10 = new constructionstage_2.ConstructionStage(10, 3, "Roof Covering Layer two", 10);
        return [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];
    };
    PlotsService.prototype.getPlots = function (SiteId) {
        var Plots;
        var p1 = new sublocation_1.SubLocation(1, SiteId, "Plot1", "P1", "Lowther Model BX", "NNLowther BX");
        var p2 = new sublocation_1.SubLocation(2, SiteId, "Plot2", "P2", "Lewis Model B", "NLewisB");
        var p3 = new sublocation_1.SubLocation(3, SiteId, "Plot3", "P3", "MacRae Model BX", "NMacrae BX");
        var p4 = new sublocation_1.SubLocation(4, SiteId, "Plot4", "P4", "Arthur Model BX", "NArthur");
        var p5 = new sublocation_1.SubLocation(5, SiteId, "Plot5", "P5", "LRanald Model Bx", "RAN BX");
        var p6 = new sublocation_1.SubLocation(6, SiteId, "Plot6", "P6", "Laird Model B", "NLairdB");
        return [p1, p2, p3, p4, p5, p6];
    };
    PlotsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlotsService);
    return PlotsService;
}());
exports.PlotsService = PlotsService;
