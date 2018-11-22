import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  errorManagement(error:any,urlWebService:string,classe:any):void{

    alert(error);

  }



}
