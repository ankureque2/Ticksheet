
export interface ISite {
    RecordID: number;
    PrimaryName: string;
    ShortCode: string;
    Address: string;
    PostCode: string;
    Telephone: string;
    Email: string;
    ProgressDate: string;

}

export class Site implements ISite{

    constructor(public RecordID: number, public PrimaryName: string,
                public ShortCode: string, public Address: string,
                public PostCode: string, public Telephone: string,
                public Email:string, public ProgressDate: string) {

            }
}

export class DownloadedSite extends Site {
    SyncDownDateTime: string; 
    Modified: boolean;
    Selected: boolean;
   
    constructor( RecordID: number, PrimaryName: string,
                 ShortCode: string,  Address: string,
                 PostCode: string,  Telephone: string,
                 Email:string,  ProgressDate: string,
                 SyncDownDateTime: string, 
                 Modified: boolean, Selected: boolean){

    super(RecordID,PrimaryName,ShortCode, Address, PostCode, Telephone, Email, ProgressDate);
    this.SyncDownDateTime = SyncDownDateTime;
    this.Modified = Modified ;
    this.Selected = Selected;
  }

  static createNotDownloadSite(site:ISite){
    return new DownloadedSite(site.RecordID,site.PrimaryName,site.ShortCode,site.Address,
                                site.PostCode,site.Telephone, site.Email,
                                site.ProgressDate, undefined, false,false);
                 }

    public copyNewProperties(housebuildingData: ISite): void {  
        this.PrimaryName = housebuildingData.PrimaryName;
        this.ShortCode = housebuildingData.ShortCode;
        this.Address = housebuildingData.Address;
        this.PostCode = housebuildingData.PostCode;
        this.Telephone = housebuildingData.Telephone;
        this.Email = housebuildingData.Email;
        this.ProgressDate = housebuildingData.ProgressDate; }
         
   
 
}