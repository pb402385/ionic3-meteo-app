import { Component } from '@angular/core';

import { ApiMeteoService } from '../service/api-meteo.service';
import { ErrorService } from '../service/error.service';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private selectedItem: any;


  public myloc: any = null;
  public items: Array<{ temperature: string; ville: string; icon: string }> = [];


  public currentLat: any = null;
  public currentLong: any = null;


  constructor(
    //public alertCtrl: AlertController,
    public apiMeteo: ApiMeteoService,
    public errorService: ErrorService
    ) {

      //On récupère la météo par géolocalisation
      this.findMe();

      //On récupère les favoris
      this.getFavoris();
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }









  /**
   * Bouton Pour récupérer la ville
   */
  presentPrompt() {
    /*
    let alert = this.alertCtrl.create({
      title: 'Entrez une ville',
      inputs: [
        {
          name: 'ville',
          placeholder: 'Ville'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            if (this.isValid(data.ville)) {
              //On cherche la ville via le web service
            } else {
              //Sinon on ne fait rien
              return false;
            }
          }
        }
      ]
    });
    alert.present();
    */
  }

  isValid(ville:string){
    return true;
  }


  getFavoris(){
    let item = JSON.parse(localStorage.getItem("myloc"));
    let length = localStorage.length;
    if(null !== item && length > 1 ){
      for(let i = 1; i < length-1; i++){
        let favori = JSON.parse(localStorage.getItem(""+i));

        this.items.push({
          temperature: favori.main.temp, 
          ville: favori.name + " ("+favori.sys.country+")",
          icon: "https://openweathermap.org/img/w/"+favori.weather[0].icon+".png" 
        });

      }
    }
  }


  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        //Puis on contruit notre élément pour le tableau angular responsive material   
        this.apiMeteo.getWeatherFromCoordinates(this.currentLat,this.currentLong).subscribe(
          response => {

            //Objet pour insérer nos données une à unes dans le tableau angular material design
            let responseJSON = response.body;
            localStorage.setItem("myloc", JSON.stringify(responseJSON));
            let item = JSON.parse(localStorage.getItem("myloc"));

            this.myloc = 
              { 
                temperature: item.main.temp, 
                ville: item.name + " ("+item.sys.country+")",
                icon: "https://openweathermap.org/img/w/"+item.weather[0].icon+".png" 
              };

          },
          error =>{
            //En cas d'ereur on affiche le message d'erreur
            if(error) this.errorService.errorManagement("Erreur lors de la récupération par géolocalisation","erreurGeolocalisation",this);
          } 
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
