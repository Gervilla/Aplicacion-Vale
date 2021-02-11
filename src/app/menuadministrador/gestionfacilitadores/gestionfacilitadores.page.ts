import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionfacilitadores',
  templateUrl: './gestionfacilitadores.page.html',
  styleUrls: ['./gestionfacilitadores.page.scss'],
})
export class GestionfacilitadoresPage implements OnInit {

  public index = 0;
  public empty = "../../assets/images/persona.png";

  public todos = [];

  public facilitadores = [];

  constructor(private storage: StorageService, public actionSheetController: ActionSheetController, private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadFacilitadores();
  }

  loadFacilitadores() {
    this.todos = [];
    this.storage.getFacilitadores().then((values) => {
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
          this.storage.getFileFromStorage("/Facilitadores/"+ value.id +"_profile_pic."+ value.foto).then(url =>{
            this.todos[i].foto = url
          })
        }
      });
      this.facilitadores= this.todos;
    });
  }
  getName1(){
    if(this.index<this.facilitadores.length)
      return this.facilitadores[this.index].nombre;
    else return "";
  }
  getFoto1(){
    if(this.index<this.facilitadores.length)
      return this.facilitadores[this.index].foto;
    else return this.empty;
  }
  isHidden1(){
    return this.index>=this.facilitadores.length;
  }

  getName2(){
    if(this.index+1<this.facilitadores.length)
      return this.facilitadores[this.index+1].nombre;
    else return "";
  }
  getFoto2(){
    if(this.index+1<this.facilitadores.length)
      return this.facilitadores[this.index+1].foto;
    else return this.empty;
  }
  isHidden2(){
    return this.index+1>=this.facilitadores.length;
  }

  getName3(){
    if(this.index+2<this.facilitadores.length)
      return this.facilitadores[this.index+2].nombre;
    else return "";
  }
  getFoto3(){
    if(this.index+2<this.facilitadores.length)
      return this.facilitadores[this.index+2].foto;
    else return this.empty;
  }
  isHidden3(){
    return this.index+2>=this.facilitadores.length;
  }

  nextPage(){
    this.index++;
  }
  previousPage(){
    this.index--;
  }

  isPButtonDisable(){
    return this.index<=0;
  }
  isNButtonDisable(){
    return this.index>=this.facilitadores.length-3;
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.facilitadores = this.todos;
    }
    else{
      this.index = 0;
      this.facilitadores = this.todos.filter(currentFacilitador => {
        if (currentFacilitador.fullname && searchTerm) {
          return (currentFacilitador.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      })
    }
  }


  opciones1(){
    this.opcionesFacilitador(0)
  }

  opciones2(){
    this.opcionesFacilitador(1)
  }

  opciones3(){
    this.opcionesFacilitador(2)
  }

  async opcionesFacilitador(boton) {
    const actionSheet = await this.actionSheetController.create({
      header: this.facilitadores[this.index+boton].fullname,
      buttons: [{
        text: 'Visualizar',
        icon: 'eye',
        handler: () => {
          this.router.navigateByUrl("/infofacilitador/"+ this.facilitadores[this.index + boton].id);
        }
      }, {
        text: 'Modificar',
        icon: 'create',
        handler: () => {
          this.router.navigateByUrl("/aniadirfacilitador/"+ this.facilitadores[this.index + boton].id);
        }
      }, {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.alertEliminar(this.facilitadores[this.index+boton]);
        }
      }]
    });
    await actionSheet.present();
  }

  async alertEliminar(facilitador) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que deseas eliminar a '+ facilitador.fullname +'?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.eliminar(facilitador) 
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(facilitador) {
    const alert = await this.alertController.create({
      message: "Se ha eliminado a "+ facilitador.fullname,
      buttons: ["OK"],
    });

    await this.storage.deleteFacilitador(facilitador.id)
    await alert.present();
    this.loadFacilitadores();
  }
}
