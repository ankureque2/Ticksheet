import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {ConstructionStage, ConstructionStageHeader} from '../../br.classes/constructionstage';
import {StagePage} from '../stage/stage';
import {NotesPage} from '../notes/notes';
import {Database} from "../../providers/database/database"; 
import {SubLocation, PlotConstructionStage, PlotStage} from '../../br.classes/sublocation';
import {StageFilterPipe} from './stage.pipe';
import {Camera} from 'ionic-native';

/*
  Generated class for the StagesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'stageheaders',
  inputs: ['headers', 'plotID', 'siteID'],
  templateUrl: 'build/pages/stages/stages.html',
  pipes: [StageFilterPipe]
})
export class StagesPage implements OnInit {
  headers: StagePage[];
  stages: PlotStage[];
  plotID: number;
  siteID: number;
  private imageLocation : string;
  private imageSrc: string;

  constructor(private dataservice: Database, private modalController : ModalController, private navCtrl: NavController) {
   this.imageLocation = "";
  }

ngOnInit() : void{
  
    this.dataservice.getSiteConstructionStages(this.siteID).then((result)=>{
  
    let conStages  = <ConstructionStage[]> result;
    this.stages = PlotStage.CreatePlotStages(conStages, this.plotID, undefined);
      },
    (error) => {
                console.log("ERROR: ", error.message);
            });   
}

StageCompletionUpdated(){



}

toggleDetails(accord: StagePage) {
  
          if (accord.showDetails) {
              accord.showDetails = false;
              accord.icon = 'ios-add-circle-outline';
        } else {
              accord.showDetails = true;
              accord.icon = 'ios-remove-circle-outline';
         }    
  }

takePicture(stageID: number, plotID: number) {
   var options = {
      quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            correctOrientation: true, 
            saveToPhotoAlbum: true
              };
       Camera.getPicture(options).then(imagePath => {
            this.imageLocation =  imagePath;
            //this.dataservice.
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });       
  }

  takeNotes(stageID: number, plotID: number) {
     var param = {PlotStageID: stageID};

    let modal = this.modalController.create(NotesPage,param);
        modal.present();
  }

private openGallery (): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    }

    Camera.getPicture(cameraOptions)
      .then(file_uri => this.imageSrc = file_uri, 
      err => console.log(err));   
    }
}

