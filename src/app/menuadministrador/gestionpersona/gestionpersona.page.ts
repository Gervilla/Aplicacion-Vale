import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../services/storage.service";
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: "app-gestionpersona",
  templateUrl: "./gestionpersona.page.html",
  styleUrls: ["./gestionpersona.page.scss"],
})

export class GestionpersonaPage implements OnInit {
  public index = 0;
  public empty = "../../assets/images/persona.png";

  public todos = [];

  public personas = [];

  constructor(private storage: StorageService, private router: Router, public actionSheetController: ActionSheetController, public alertController: AlertController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadPersonas();
  }

  loadPersonas() {
    this.todos = [];
    this.storage.getPersonas().then((values) => {
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
    return this.index >= this.personas.length - 3;
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

  async opcionesPersonas(boton) {
    const actionSheet = await  this.actionSheetController.create({
      header: this.personas[this.index + boton].fullname,
      buttons: [
        {
          text: "Visualizar",
          icon: "eye",
          handler: () => {
            this.router.navigateByUrl("/infopersona/"+ this.personas[this.index + boton].id);
          },
        },
        {
          text: "Modificar",
          icon: "create",
          handler: () => {
            this.router.navigateByUrl("/aniadirpersona/"+ this.personas[this.index + boton].id);
          },
        },
        {
          text: "Eliminar",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.alertEliminar(this.personas[this.index + boton]);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async alertEliminar(persona) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que deseas eliminar a '+ persona.fullname +'?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.eliminar(persona)
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(persona) {
    const alert = await this.alertController.create({
      message: "Se ha eliminado "+ persona.fullname,
      buttons: ["OK"],
    });

    await this.storage.deletePersona(persona.id)
    await alert.present();
    this.loadPersonas();
  }
}
