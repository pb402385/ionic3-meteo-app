import { Component, OnInit } from '@angular/core';

import { ApiMeteoService } from '../service/api-meteo.service';
import { ErrorService } from '../service/error.service';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.page.html',
  styleUrls: ['./meteo-detail.page.scss'],
})
export class MeteoDetailPage implements OnInit {

  public id: string = null;

  public elem: any = null;

  public itemShown: number = null;

  constructor(
    public apiMeteo: ApiMeteoService,
    public errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit() {

    //TODO Récupérer l'id de la ville
    this.route.queryParamMap.subscribe(params => {

        //Paramètres retournés après l'appel au web service Patch pour l'acceptation/refus pour afficher un log de succès
        if(params.get("id")){

          let item = JSON.parse(localStorage.getItem(params.get("id")));
          //On récupère l'id
          let idVille = item.id;

          //On récupère les données
          this.apiMeteo.getWeatherFromId(idVille).subscribe(
            response => {

              //Objet pour insérer nos données une à unes dans le tableau angular material design
              let responseJSON = response.body;
              this.saveItem(responseJSON,""+this.id);

            },
            error =>{
              //En cas d'ereur on affiche le message d'erreur
              if(error) this.errorService.errorManagement("Erreur lors de la récupération pour l'affichage par détail","erreurDetail",this);
            } 
          );
      }else{
          this.errorService.errorManagement("Erreur lors de la récupération pour l'affichage par détail (Pas d'identifiant)","erreurDetail",this);
      }
    });

  }

  saveItem(responseJSON:any,id:string){
    this.elem = responseJSON;
  }



  formatDate(n:number,type: string){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let d = new Date(n*1000);

    let day = ""+d.getDate();
    if(parseInt(day)<10) day = "0"+day;

    let month = ""+(d.getMonth()+1);
    if(parseInt(month)<10) month = "0"+month;

    let dateFormatted = day+"/"+month+"/"+d.getFullYear();
    return dateFormatted;
  }

  show(num:number){
    this.itemShown = num;
    this.clear();
    document.getElementById(""+num).style.border = "2px double black";
    document.getElementById(""+num).style.borderRadius = "2px";
  }

  clear(){
    document.getElementById("0").style.border = "none";
    document.getElementById("7").style.border = "none";
    document.getElementById("15").style.border = "none";
    document.getElementById("23").style.border = "none";
    document.getElementById("31").style.border = "none";
  }

  goHome(){

    this.router.navigate(['/home']);

  }

}
