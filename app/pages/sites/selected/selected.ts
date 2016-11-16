import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, App} from 'ionic-angular';
import {Database} from '../../../providers/database/database';
import {DownloadedSite} from '../site';
import {DetailsPage} from '../details/details';
import {SublocationsPage} from '../../sublocations/sublocations'
/*
  Generated class for the SelectedPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/sites/selected/selected.html',
})
export class SelectedSites implements OnInit {
 items : DownloadedSite[];

  constructor(private nav: NavController,
              private modalController : ModalController,
              private localdataService: Database,
              private app: App) {    

  }

  ngOnInit(): void {
             
        this.localdataService.getSelectedSites().then((result) => {
         this.items =  <DownloadedSite[]> result;           
          }, (error) => {
                console.log("ERROR: ", error.message);
            }); 
   }

  onSelectedChanged(ev: any, recordId : number)
   {
     let selectedsite: DownloadedSite = this.items.find(ds=>ds.RecordID == recordId);
     this.localdataService.changeSiteStatus(recordId,false);
     let index = this.items.indexOf(selectedsite);
     if (index > -1){
        this.items.splice(index,1);
     }    
    }

   openModal(recordId : number){
     var param = {selected: this.items.find(s=>s.RecordID == recordId)}
      let modal = this.modalController.create(DetailsPage,param);
      modal.present();
   }

  showPlots(recordId : number){
     this.app.getRootNav().push(SublocationsPage,{siteID: recordId});        
   }  

}
