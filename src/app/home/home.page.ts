import { Component } from '@angular/core';

import { ApiMeteoService } from '../service/api-meteo.service';
import { ErrorService } from '../service/error.service';

import { AlertController, Nav  } from '@ionic/angular';

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

  public alrt:any = null;


  constructor(
    public alertController: AlertController,
    public apiMeteo: ApiMeteoService,
    public errorService: ErrorService,
    //public nav: Nav
    ) {

      //On récupère les favoris
      this.getFavoris();
  }

  ngOnInit() {
    //On récupère la météo par géolocalisation
    this.findMe();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }






  /**
   * Item list click
   */
  itemClick(index){
    alert("item clicked "+index);
  }



  /**
   * Bouton Pour récupérer la ville
   */
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Entrez une ville!',
      inputs: [
        {
          name: 'ville',
          type: 'text',
          placeholder: 'Ville'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Valider',
          handler: data => {
            console.log(data.ville);
            if(this.isValid(data.ville)){
              this.saveVille(data.ville);
            }else{
              this.errorService.errorManagement("Erreur lors de la récupération par ville (ville déjà entrée)","erreurVille",this);
            }
          }
        }
      ]
    });

    await alert.present();
  }
 

  isValid(ville:string){
    let item = JSON.parse(localStorage.getItem("myloc"));
    let length = localStorage.length;

    if (item !== null) length = length -1;

    for(let i = 0; i < length; i++){
      let item = JSON.parse(localStorage.getItem(""+i)); 
      let villeToCompare = item.name;
      if(ville.toUpperCase() === villeToCompare.toUpperCase()){
        return false;
      }
    }
    return true;
  }


  getFavoris(){
    let item = JSON.parse(localStorage.getItem("myloc"));
    let length = localStorage.length;

    if (item !== null) length = length -1;

      for(let i = 0; i < length; i++){
        let favori = JSON.parse(localStorage.getItem(""+i));

        this.items.push({
          temperature: favori.main.temp+" °C", 
          ville: favori.name + " ("+favori.sys.country+")",
          icon: "https://openweathermap.org/img/w/"+favori.weather[0].icon+".png" 
        });

      }
    
  }

  saveVille(ville){
    this.apiMeteo.getWeatherFromCityName(ville).subscribe(
      response => {

        //Objet pour insérer nos données une à unes dans le tableau angular material design
        let responseJSON = response.body;

        let id = localStorage.length;
        if(localStorage.getItem("myloc") !== null) id = id -1;

        localStorage.setItem(""+id, JSON.stringify(responseJSON));
        let item = JSON.parse(localStorage.getItem(""+id));

        let itemTab = 
          { 
            temperature: item.main.temp, 
            ville: item.name + " ("+item.sys.country+")",
            icon: "https://openweathermap.org/img/w/"+item.weather[0].icon+".png" 
          };

        this.items.push(itemTab);

      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement("Erreur lors de la récupération par ville","erreurVille",this);
      } 
    );
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
                temperature: item.main.temp+" °C", 
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
