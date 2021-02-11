import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageService } from "../services/storage.service";

@Component({
  selector: "app-infoejercicio",
  templateUrl: "./infoejercicio.page.html",
  styleUrls: ["./infoejercicio.page.scss"],
})
export class InfoejercicioPage implements OnInit {
  foto;
  ejercicio;
  fechaInicio; fechaFinal
  videoSrc = [];
  audioSrc = [];
  semanaStr = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];
  personas = [];

  constructor(
    private storage: StorageService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute
  ) {
    this.foto = "../../assets/images/default-pic.png";
    this.ejercicio = { nombre: "", enunciado: "" };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadEjercicio();
  }

  loadEjercicio() {
    this.videoSrc = [];
    this.audioSrc = [];
    var id = parseInt(this.activatedRoute.snapshot.paramMap.get("idEjercicio"));
    this.storage.getEjercicio(id).then((value) => {
      this.ejercicio = value;
      this.fechaInicio = new Date(this.ejercicio.fechaInicio).toDateString()
      this.fechaFinal = new Date(this.ejercicio.fechaFinal).toDateString()
      if (this.ejercicio.foto != "") {
        this.storage
          .getFileFromStorage(
            "/Ejercicios/" + id + "/foto." + this.ejercicio.foto
          )
          .then((url) => {
            this.foto = this.ejercicio.foto = url;
          });
      }
      if (this.ejercicio.video != "") {
        this.storage
          .getFileFromStorage(
            "/Ejercicios/" + id + "/video." + this.ejercicio.video
          )
          .then((url) => {
            this.videoSrc.push(url);
          });
      }
      if (this.ejercicio.audio != "") {
        this.storage
          .getFileFromStorage(
            "/Ejercicios/" + id + "/audio." + this.ejercicio.audio
          )
          .then((url) => {
            this.audioSrc.push(url);
          });
      }
      this.loadPersonas();
    });
  }

  async loadPersonas() {
    this.personas = [];
    let entregas = await this.storage.getEntregasByEjercicio(this.ejercicio.id);
    this.storage.getPersonas().then((values) => {
      values.sort(function (a, b) {
        if (a.nombre < b.nombre) {
          return -1;
        }
        if (a.nombre > b.nombre) {
          return 1;
        }
        return 0;
      });
      values.forEach((value) => {
        var entregaIndex = entregas.findIndex(
          (element) => element.idPersona == value.id
        );
        if (entregaIndex != -1) {
          this.personas.push({
            id: value.id,
            fullname: value.nombre + " " + value.apellido,
            foto: "../../assets/images/persona.png",
            idEntrega: entregas[entregaIndex].id,
          });
          if (value.foto != "") {
            let i = this.personas.length - 1;
            this.storage
              .getFileFromStorage(
                "/Personas/" + value.id + "_profile_pic." + value.foto
              )
              .then((url) => {
                this.personas[i].foto = url;
              });
          }
        }
      });
    });
  }
  /*getFoto(index) {
    if (this.index < this.personas.length)
      return this.personas[this.index].foto;
    else return this.empty;
  }*/
}
