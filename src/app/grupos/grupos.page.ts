import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  public index = 0;
  idFacilitador;
  public todos = [];
  public grupos = [];

  constructor(private storage: StorageService, private router: Router, public actionSheetController: ActionSheetController, public alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "facilitador"){
          this.idFacilitador = value.id
          this.loadGrupos()
        }
      }
      else this.router.navigateByUrl('/');
    })
  }

  loadGrupos() {
    this.storage.getGrupos(this.idFacilitador).then((values) => {
      values.sort(function(a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
      })
      this.grupos = this.todos = values;
    });
  }

  getName1() {
    if (this.index < this.grupos.length)
      return this.grupos[this.index].nombre;
    else return "";
  }
  isHidden1() {
    return this.index >= this.grupos.length;
  }

  getName2() {
    if (this.index + 1 < this.grupos.length)
      return this.grupos[this.index + 1].nombre;
    else return "";
  }
  isHidden2() {
    return this.index + 1 >= this.grupos.length;
  }

  getName3() {
    if (this.index + 2 < this.grupos.length)
      return this.grupos[this.index + 2].nombre;
    else return "";
  }
  isHidden3() {
    return this.index + 2 >= this.grupos.length;
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
    return this.index >= this.grupos.length - 3;
  }

  opciones1() {
    this.opcionesGrupo(0);
  }

  opciones2() {
    this.opcionesGrupo(1);
  }

  opciones3() {
    this.opcionesGrupo(2);
  }

  async opcionesGrupo(boton) {
    const actionSheet = await  this.actionSheetController.create({
      header: this.grupos[this.index + boton].nombre,
      buttons: [
        {
          text: "Visualizar",
          icon: "eye",
          handler: () => {
            this.router.navigateByUrl("/infogrupo/"+ this.grupos[this.index + boton].id);
          },
        },
        {
          text: "Modificar",
          icon: "create",
          handler: () => {
            this.router.navigateByUrl("/creargrupo/"+ this.grupos[this.index + boton].id);
          },
        },
        {
          text: "Eliminar",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.alertEliminar(this.grupos[this.index + boton]);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async alertEliminar(grupo) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que deseas eliminar al grupo: '+ grupo.nombre +'?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.eliminar(grupo)
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(grupo) {
    const alert = await this.alertController.create({
      message: "Se ha eliminado a "+ grupo.nombre,
      buttons: ["OK"],
    });

    await this.storage.deleteGrupo(grupo.id)
    await alert.present();
    this.loadGrupos();
  }
}
