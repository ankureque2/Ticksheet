import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ISite} from './site';
import {Page} from 'ionic-angular';
import {SitesService} from './sites.service';
import {Injectable, OnInit} from '@angular/core';
import {AllSites} from './all/all';
import {SelectedSites} from './selected/selected';
import {SQLite} from "ionic-native";


@Component({
  templateUrl: 'build/pages/sites/sites.html'
})

export class Sites {
  private allPage: any;
  private selectedPage: any;
  
  constructor(private navCtrl: NavController, navParams: NavParams, private siteservice : SitesService) {
    // If we navigated to this page, we will have an item available as a nav param
      this.allPage = AllSites;
      this.selectedPage = SelectedSites;

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Sites, {
      item: item
    });

  }
 
}
