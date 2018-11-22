import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_URL_ID = "https://api.openweathermap.org/data/2.5/forecast";

const APP_ID = "&APPID=dcdfa133415e1fa8eddae2f34f5b07a4&units=metric";

@Injectable({
  providedIn: 'root'
})
export class ApiMeteoService {

  constructor(public http:HttpClient) { }


  public getWeatherFromCoordinates(lat:number, lon:number) :any{


    //header
    var requestHeaders = new HttpHeaders();

    //param
    var path = "?lat="+lat+"&lon="+lon;

    //appel du service
    return this.http.get(API_URL + path + APP_ID, {
      headers: requestHeaders,
      observe: 'response'
    });

  }

  public getWeatherFromCityName(name:string) :any{


    //header
    var requestHeaders = new HttpHeaders();

    //param
    var path = "?q="+name;

    //appel du service
    return this.http.get(API_URL + path + APP_ID, {
      headers: requestHeaders,
      observe: 'response'
    });

  }

  public getWeatherFromId(id:any) :any{


    //header
    var requestHeaders = new HttpHeaders();

    //param
    var path = "?id="+id;

    //appel du service
    return this.http.get(API_URL_ID + path + APP_ID, {
      headers: requestHeaders,
      observe: 'response'
    });

  }


}