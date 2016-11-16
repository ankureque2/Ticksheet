import { Component, Input } from '@angular/core';
import { NavController, ModalController, App } from 'ionic-angular';
import {ISite} from '../site';
import {SitesService} from '../sites.service';
import {Injectable, OnInit} from '@angular/core';
import {DownloadedSite} from "../site";
import {Database} from '../../../providers/database/database';
import {DetailsPage} from '../details/details';
import {SublocationsPage} from '../../sublocations/sublocations'


@Component({
  templateUrl: 'build/pages/sites/all/all.html',
})

export class AllSites implements OnInit{

  sitesList : DownloadedSite[]; 
  
  constructor(private nav: NavController, private siteservice : SitesService, 
              private modalController : ModalController, 
              private localdataService: Database, private app: App) {

    }
  
  ngOnInit(): void {         

         this.localdataService.getDownloadedSites().then((result) => {
         this.sitesList = new Array<DownloadedSite>(); 
         let sites = this.siteservice.getSites();
         let downloadedSites = <DownloadedSite[]> result;
        
         for(let item of sites){
            let match = downloadedSites.find(i=>i.RecordID === item.RecordID)
            if(match == undefined){
                let notDownlaodSite = DownloadedSite.createNotDownloadSite(item)
                this.sitesList.push(notDownlaodSite)
               }
            else{
                  match.copyNewProperties(item);
                  this.sitesList.push(match);               
              }
            }          
          
          }, (error) => {
                console.log("ERROR: ", error.message);
            });               
   }

  getSites(ev: any) {
   this.ngOnInit();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {    
      this.sitesList = this.sitesList.filter((item) => {
        return (item.PrimaryName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onSelected(ev: any, recordId : number){
    let isSelected: boolean = Boolean(ev.checked);
    let id = recordId;
    let site: ISite = this.sitesList.find(st=> st.RecordID == id);
    console.log(isSelected);      
    this.localdataService.saveSite(site, isSelected); 

   } 

   openModal(recordId : number){
     var param = {selected: this.sitesList.find(s=>s.RecordID == recordId)}
      let modal = this.modalController.create(DetailsPage,param);
      modal.present();
   }

     showPlots(recordId : number){
     this.app.getRootNav().push(SublocationsPage,{siteID: recordId});        
   }  

}
