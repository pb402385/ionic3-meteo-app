import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public alertController: AlertController) { }

  errorManagement(error:any,urlWebService:string,classe:any):void{

    this.presentAlert(urlWebService,error);

  }

  async presentAlert(service,message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: service,
      message: message,
      buttons: ['Ok'],
      cssClass: 'profalert'
    });

    await alert.present();
  }




}
