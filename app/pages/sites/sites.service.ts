import {Injectable} from '@angular/core';
import {ISite} from './site';

@Injectable()
export class SitesService{

    getSites(): ISite[]{
    return [
    {
        "RecordID": 1,
        "PrimaryName": "Monkton Heathfield",
        "ShortCode": "Monkton Heathfield by Somerset County Council/ Taunton Deane ",
        "PostCode": "SON 11D",
        "Address": "Heathfield Road",       
        "Telephone": "0234234545",
        "Email": "site@xyz.com",
        "ProgressDate": new Date("2016-07-05").toISOString(),
    },
    {
        "RecordID": 2,
        "PrimaryName": "Acton, London Borough of Ealing ",
        "ShortCode": "Acton, London Borough of Ealing",
        "Address": "Acton Underground Station",
        "PostCode": "UB3 1BN",
        "Telephone": "012365489",
        "Email": "site@xyz.com",
        "ProgressDate": new Date("2016-06-14").toISOString()
      },
    {
        "RecordID": 5,
        "PrimaryName": "South Kilburn Regeneration Developer Framework",
        "ShortCode": "London Borough of Brent",
        "Address": "Kilburn Highstreet",
        "PostCode": "HA5 7GH",
        "Telephone": "0124123654",
        "Email": "site@xyz.com",
        "ProgressDate": new Date("2016-08-10").toISOString()
    },
    {
        "RecordID": 8,
        "PrimaryName": "Riverside Quarter",
        "ShortCode": "Frasers Riverside Quarter Ltd ",
        "Address": "Wandsworth, London ",
         "PostCode": "TBX-0022",
        "Telephone": "013698745",
        "Email": "site@xyz.com",
        "ProgressDate": new Date("2016-08-15").toISOString()     
    },
    {
        "RecordID": 10,
        "PrimaryName": "King William Street",
        "ShortCode": "Quarter and Eastern End, Thames View",       
        "Address": "King William Street, Quarter and Eastern End, Thames View",
        "PostCode": "NW9 1WQ",
        "Telephone": "0044569875623",
        "Email": "site@xyz.com",
        "ProgressDate": new Date("2016-08-06").toISOString()   
    }
]}

}