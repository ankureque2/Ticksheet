export class SubLocationConStageImage
{
    RecordID: number;
    SublocationConStageID: number;
    PhotoURL: string
    constructor(recordID: number, subLocStageID: number,
                PhotoLoation: string){
                this.RecordID = recordID;
                this.SublocationConStageID =subLocStageID;
                this.PhotoURL = PhotoLoation;
                }
}

export class SubLocationConStageNote{
    RecordID: number;
    SublocationConStageID: number;
    Notes : string;
    NotesDateTime: string;

    constructor(RecordID: number, 
                SublocationConStageID: number,
                Notes : string,
                NotesDateTime: string){

      this.RecordID = RecordID;
      this.SublocationConStageID = SublocationConStageID;
      this.Notes = Notes;
      this.NotesDateTime = NotesDateTime;
    }
}