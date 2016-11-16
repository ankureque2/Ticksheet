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
var ionic_angular_1 = require('ionic-angular');
var register_1 = require('./pages/register/register');
var sites_1 = require('./pages/sites/sites');
var sites_service_1 = require('./pages/sites/sites.service');
var database_1 = require('./providers/database/database');
var ionic_native_1 = require('ionic-native');
var plots_service_1 = require('./providers/plots-service/plots-service');
var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
        this.platform = platform;
        platform.ready().then(function () {
            _this.initializeApp();
            // used for an example of ngFor and navigation
            _this.pages = [
                { title: 'Registration', component: register_1.Register },
                { title: 'Sites', component: sites_1.Sites }
            ];
            _this.rootPage = register_1.Register;
        });
    }
    MyApp.prototype.appRegistered = function () {
        var registered = false;
        var dataservice = new database_1.Database();
        dataservice.getActivationInfo().then(function (result) {
            var r = result;
            if (r !== undefined && r.activationCode !== undefined && r.activationCode !== '') {
                alert(r.activationCode);
                registered = true;
            }
            else {
                registered = false;
            }
        }, function (error) {
            console.log("ERROR: ", error.message);
            registered = false;
        });
        return registered;
    };
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav), 
        __metadata('design:type', ionic_angular_1.Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'build/app.html',
            providers: [sites_service_1.SitesService, plots_service_1.PlotsService, database_1.Database],
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
ionic_angular_1.ionicBootstrap(MyApp);
