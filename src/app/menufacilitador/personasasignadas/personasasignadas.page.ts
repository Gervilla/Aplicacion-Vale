import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../services/storage.service";
import { ActionSheetController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: "app-personasasignadas",
  templateUrl: "./personasasignadas.page.html",
  styleUrls: ["./personasasignadas.page.scss"],
})
export class PersonasAsignadasPage implements OnInit {
  public index = 0;
  public empty = "../../assets/images/persona.png";

  public todos = [];
  public personas = [];

  constructor(
    private storage: StorageService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.getUsuarioActivo().then((value) => {
      if (value) {
        if (value.tipo == "facilitador") {
          this.loadPersonas(value.id);
        }
      } else this.router.navigateByUrl("/");
    });
  }

  loadPersonas(idFacilitador) {
    this.todos = []
    this.storage.getPersonasByFacilitador(idFacilitador).then((values) => {
      values.sort(function(a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
      })
      values.forEach((value) => {
        this.todos.push({
          id: value.id,
          fullname: value.nombre + " " + value.apellido,
          nombre: value.nombre + " " + value.apellido.charAt(0) + ".",
          foto: this.empty,
        });
        if (value.foto != "") {
          let i = this.todos.length - 1;
          this.storage.getFileFromStorage("/Personas/"+ value.id +"_profile_pic."+ value.foto).then(url =>{
            this.todos[i].foto = url
          })
        }
      });
      
      this.personas = this.todos;
    });
  }

  getName1() {
    if (this.index < this.personas.length)
      return this.personas[this.index].nombre;
    else return "";
  }
  getFoto1() {
    if (this.index < this.personas.length)
      return this.personas[this.index].foto;
    else return this.empty;
  }
  isHidden1() {
    return this.index >= this.personas.length;
  }

  getName2() {
    if (this.index + 1 < this.personas.length)
      return this.personas[this.index + 1].nombre;
    else return "";
  }
  getFoto2() {
    if (this.index + 1 < this.personas.length)
      return this.personas[this.index + 1].foto;
    else return this.empty;
  }
  isHidden2() {
    return this.index + 1 >= this.personas.length;
  }

  getName3() {
    if (this.index + 2 < this.personas.length)
      return this.personas[this.index + 2].nombre;
    else return "";
  }
  getFoto3() {
    if (this.index + 2 < this.personas.length)
      return this.personas[this.index + 2].foto;
    else return this.empty;
  }
  isHidden3() {
    return this.index + 2 >= this.personas.length;
  }

  getName4() {
    if (this.index + 3 < this.personas.length)
      return this.personas[this.index + 3].nombre;
    else return "";
  }
  getFoto4() {
    if (this.index + 3 < this.personas.length)
      return this.personas[this.index + 3].foto;
    else return this.empty;
  }
  isHidden4() {
    return this.index + 3 >= this.personas.length;
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
    return this.index >= this.personas.length - 4;
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.personas = this.todos;
    } else {
      this.index = 0;
      this.personas = this.todos.filter((currentPersona) => {
        if (currentPersona.fullname && searchTerm) {
          return (
            currentPersona.fullname
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        }
      });
    }
  }

  opciones1() {
    this.opcionesPersonas(0);
  }

  opciones2() {
    this.opcionesPersonas(1);
  }

  opciones3() {
    this.opcionesPersonas(2);
  }

  opciones4() {
    this.opcionesPersonas(3);
  }

  async opcionesPersonas(boton) {
    this.router.navigateByUrl("/infopersona/"+ this.personas[this.index + boton].id);
  }
}
