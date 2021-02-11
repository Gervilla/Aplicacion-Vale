import { Component, OnInit } from '@angular/core';
import { FeedbackGeneral, StorageService } from "../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: 'app-listafeedback',
  templateUrl: './listafeedback.page.html',
  styleUrls: ['./listafeedback.page.scss'],
})
export class ListafeedbackPage implements OnInit {
  public index = 0;
  public empty = "../../assets/images/persona.png";

  public todos = [];
  public feedbacks = [];

  public caras = ["../../assets/icon/valoracion/valoracion1.png",
  "../../assets/icon/valoracion/valoracion2.png",
  "../../assets/icon/valoracion/valoracion3.png",
  "../../assets/icon/valoracion/valoracion4.png",
  "../../assets/icon/valoracion/valoracion5.png"];

  constructor(//******** */
    private storage: StorageService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadFeedbacks()
  }

  async loadFeedbacks() {
    this.todos = []
    var personas = await this.storage.getPersonas()
    this.storage.getFeedbacks().then((values) => {
      values.forEach((value) => {
        var personaIndex = personas.findIndex(element => element.id == value.idPersona) 
        this.todos.push({
          id: value.id,
          satisfacion: value.satisfaccion,
          idPersona: value.idPersona,
          nombreCompleto: personas[personaIndex].nombre + " " + personas[personaIndex].apellido
        });
      });
      this.todos.sort(function(a, b){
        if(a.nombreCompleto < b.nombreCompleto) { return -1; }
        if(a.nombreCompleto > b.nombreCompleto) { return 1; }
        return 0;
      })
      this.feedbacks = this.todos;
    });
  }

  getName(num){
    if( (this.index + num) < this.feedbacks.length )
      return this.feedbacks[num+this.index].nombreCompleto;
    else return "";
  }

  getFoto(num){
    if ( (this.index + num) < this.feedbacks.length)
      return this.caras[this.feedbacks[num+this.index].satisfacion - 1];
    else return this.empty;  
  }

  isHidden(num){
    return (this.index + num) >= this.feedbacks.length;
  }

  nextPage() {
    this.index++;
  }
  previousPage() {
    this.index--;
  }

  isPButtonDisable() {
    return this.index <= 0;
  }
  isNButtonDisable() {
    return this.index >= this.feedbacks.length - 4;
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.feedbacks = this.todos;
    } else {
      this.index = 0;
      this.feedbacks = this.todos.filter((currentFeedback) => {
        if (currentFeedback.nombreCompleto && searchTerm) {
          return (
            currentFeedback.nombreCompleto
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        }
      });
    }
  }

  opcion(num){
    this.router.navigateByUrl("/infofeedback/"+ this.feedbacks[this.index + num].id);
  }
  

}
