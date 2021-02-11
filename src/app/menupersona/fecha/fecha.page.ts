import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../services/storage.service";
import { ActionSheetController } from "@ionic/angular";
import { Router } from "@angular/router";
import { toUnicode } from "punycode";

@Component({
  selector: "app-fecha",
  templateUrl: "./fecha.page.html",
  styleUrls: ["./fecha.page.scss"],
})
export class FechaPage implements OnInit {
  public index = 0;
  public empty = "../../assets/images/transparent.png";
  hoy = new Date(new Date().setUTCHours(0, 0, 0, 0));

  todayIcon = "../../assets/icon/today.png";
  afterIcon = "../../assets/icon/tomorrow.png";

  ejercicios = [];
  colores = ["vale-secondary", "vale-pink", "purple", "rosa"];
  constructor(
    private storage: StorageService,
    private router: Router,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.getUsuarioActivo().then((value) => {
      if (value) {
        if (value.tipo == "persona") {
          this.loadEjercicios(value.id);
        }
      } else this.router.navigateByUrl("/");
    });
  }

  loadEjercicios(idPersona) {
    this.ejercicios = [];
    var count = 0;
    var colorCount = 0;
    this.storage.getEjerciciosPendientes(idPersona,true).then((values) => {
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
        var inicio = new Date(value.fechaInicio).getTime();
        var final = new Date(value.fechaFinal).getTime();

        if (count == 0) {
          if (this.hoy.getTime() >= inicio && this.hoy.getTime() <= final) {
            this.ejercicios.push({
              id: 0,
              nombre: "Hoy",
              icono: "../../assets/icon/today.png",
              color: "vale-orange",
            });
          }
          count = 1;
        }
        var TiempoContador = new Date(
          new Date().setUTCHours(count * 24, 0, 0, 0)
        ).getTime();
        if (inicio >= TiempoContador) {
          count = (inicio - this.hoy.getTime()) / 86400000 + 1;
          this.ejercicios.push({
            id: count - 1,
            nombre: count == 2 ? "Mañana" : "En " + (count - 1) + " dias",
            icono: "../../assets/icon/tomorrow.png",
            color: this.colores[colorCount],
          });
          colorCount = (colorCount + 1) % this.colores.length;
        }
      });
    });
  }

  getText1() {
    if (this.index < this.ejercicios.length)
      return this.ejercicios[this.index].nombre;
    else return "";
  }
  getIcon1() {
    if (this.index < this.ejercicios.length)
      return this.ejercicios[this.index].icono;
    else return this.empty;
  }
  getColor1() {
    if (this.index < this.ejercicios.length)
      return this.ejercicios[this.index].color;
    else return "white";
  }
  isHidden1() {
    return this.index >= this.ejercicios.length;
  }

  getText2() {
    if (this.index + 1 < this.ejercicios.length)
      return this.ejercicios[this.index + 1].nombre;
    else return "";
  }

  getIcon2() {
    if (this.index + 1 < this.ejercicios.length)
      return this.ejercicios[this.index + 1].icono;
    else return this.empty;
  }

  getColor2() {
    if (this.index + 1 < this.ejercicios.length)
      return this.ejercicios[this.index + 1].color;
    else return "white";
  }

  isHidden2() {
    return this.index + 1 >= this.ejercicios.length;
  }

  getText3() {
    if (this.index + 2 < this.ejercicios.length)
      return this.ejercicios[this.index + 2].nombre;
    else return "";
  }
  getIcon3() {
    if (this.index + 2 < this.ejercicios.length)
      return this.ejercicios[this.index + 2].icono;
    else return this.empty;
  }

  getColor3() {
    if (this.index + 2 < this.ejercicios.length)
      return this.ejercicios[this.index + 2].color;
    else return "white";
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

  opciones1() {
    this.opcionesPersonas(0);
  }

  opciones2() {
    this.opcionesPersonas(1);
  }

  opciones3() {
    this.opcionesPersonas(2);
  }

  opcionesPersonas(boton) {
    this.router.navigateByUrl(
      "/ejercicios/" + this.ejercicios[this.index + boton].id
    );
  }
}
