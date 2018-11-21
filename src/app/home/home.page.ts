import { Component } from '@angular/core';

import { ApiMeteoService } from '../service/api-meteo.service';
import { ErrorService } from '../service/error.service';

//import { AlertController } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  public myloc: any = null;
  public items: Array<{ title: string; note: string; icon: string }> = [];


  public currentLat: any = null;
  public currentLong: any = null;


  constructor(
    //private alertCtrl: AlertController
    public apiMeteo: ApiMeteoService,
    public errorService: ErrorService
    ) {

      //On récupère la météo par géolocalisation
      this.findMe();

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
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
