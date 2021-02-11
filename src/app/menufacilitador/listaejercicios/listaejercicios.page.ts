import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-listaejercicios",
  templateUrl: "./listaejercicios.page.html",
  styleUrls: ["./listaejercicios.page.scss"],
})
export class ListaejerciciosPage implements OnInit {
  index = 0;

  borradores = true;
  searchTerm = "";
  idFacilitador

  todos = [];
  ejercicios = [];
  empty = "";

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
          this.idFacilitador = value.id
          this.loadEjercicios();
        }
      } else this.router.navigateByUrl("/");
    });
  }

  loadEjercicios() {
    this.todos = []
    this.storage.getEjerciciosByFacilitador(this.idFacilitador).then((values) => {
      values.sort(function (a, b) {
        var at = new Date(a.fechaInicio).getTime();
        var bt = new Date(b.fechaInicio).getTime();
        if (at < bt) {
          return -1;
        }
        if (at > bt) {
          return 1;
        }
        return 0;
      });
      values.forEach((value) => {
        this.todos.push({
          id: value.id,
          nombre: value.nombre,
          icono: "../../assets/images/default-pic2.png",
          borrador: value.borrador,
        });
        if (value.foto != "") {
          let i = this.todos.length - 1;
          this.storage
            .getFileFromStorage(
              "/Ejercicios/" + value.id + "/foto." + value.foto
            )
            .then((url) => {
              this.todos[i].icono = url;
            });
        }
      });
      this.cambiarFiltro();
    });
  }

  getName1() {
    if (this.index < this.ejercicios.length)
      return this.ejercicios[this.index].nombre;
    else return "";
  }
  getIcon1() {
    if (this.index < this.ejercicios.length)
      return this.ejercicios[this.index].icono;
    else return this.empty;
  }
  isHidden1() {
    return this.index >= this.ejercicios.length;
  }

  getName2() {
    if (this.index + 1 < this.ejercicios.length)
      return this.ejercicios[this.index + 1].nombre;
    else return "";
  }
  getIcon2() {
    if (this.index + 1 < this.ejercicios.length)
      return this.ejercicios[this.index + 1].icono;
    else return this.empty;
  }
  isHidden2() {
    return this.index + 1 >= this.ejercicios.length;
  }

  getName3() {
    if (this.index + 2 < this.ejercicios.length)
      return this.ejercicios[this.index + 2].nombre;
    else return "";
  }
  getIcon3() {
    if (this.index + 2 < this.ejercicios.length)
      return this.ejercicios[this.index + 2].icono;
    else return this.empty;
  }
  isHidden3() {
    return this.index + 2 >= this.ejercicios.length;
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
    return this.index >= this.ejercicios.length - 3;
  }

  opcionesGeneral(boton) {
    if(this.borradores)
      this.opcionesEjercicios(boton)
    else this.router.navigateByUrl("/infoejercicio/" + this.ejercicios[this.index + boton].id)
  }

  async opcionesEjercicios(boton) {
    const actionSheet = await this.actionSheetController.create({
      header: this.ejercicios[this.index + boton].nombre,
      buttons: [
        {
          text: "Modificar",
          icon: "create",
          handler: () => {
            this.router.navigateByUrl("/crearejercicio/" + this.ejercicios[this.index + boton].id);
          },
        },
        {
          text: "Eliminar",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.alertEliminar(this.ejercicios[this.index + boton]);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async alertEliminar(ejercicio) {
    const alert = await this.alertController.create({
      header: "Advertencia",
      message: "¿Seguro que deseas eliminar el ejercicio: " + ejercicio.nombre + "?",
      buttons: [
        {
          text: "NO",
          role: "cancel",
        },
        {
          text: "SI",
          handler: () => {
            this.eliminar(ejercicio)
          },
        },
      ],
    });
    await alert.present();
  }
  

  async eliminar(ejercicio) {
    const alert = await this.alertController.create({
      message: "Se ha eliminado a "+ ejercicio.nombre,
      buttons: ["OK"],
    });

    await this.storage.deleteEjercicio(ejercicio.id)
    await alert.present();
    this.loadEjercicios();
  }

  async filterList(evt) {
    this.searchTerm = evt.srcElement.value;
    this.cambiarFiltro();
  }

  Borradores() {
    this.borradores = true;
    this.cambiarFiltro();
  }
  Enviados() {
    this.borradores = false;
    this.cambiarFiltro();
  }
  cambiarFiltro() {
    this.index = 0;
    this.ejercicios = this.todos.filter((currentEjercicio) => {
      if (currentEjercicio.borrador == this.borradores) {
        if (this.searchTerm) {
          return (
            currentEjercicio.nombre
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1
          );
        } else return currentEjercicio.nombre;
      }
    });
  }
}
