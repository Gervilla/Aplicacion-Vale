import { Component, OnInit } from "@angular/core";
import {
  FeedbackGeneral,
  StorageService,
} from "../../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-infofeedback",
  templateUrl: "./infofeedback.page.html",
  styleUrls: ["./infofeedback.page.scss"],
})
export class InfofeedbackPage implements OnInit {
  public feedback = { id: -1,satisfaccion: -1, comentario: "", audio: "", video: "" };
  public empty = "../../assets/images/persona.png";
  transparent = "../../assets/images/transparent.png";
  foto;
  persona;
  videoSrc = [];
  audioSrc = [];

  public caras = [
    "../../assets/icon/valoracion/valoracion1.png",
    "../../assets/icon/valoracion/valoracion2.png",
    "../../assets/icon/valoracion/valoracion3.png",
    "../../assets/icon/valoracion/valoracion4.png",
    "../../assets/icon/valoracion/valoracion5.png",
  ];

  constructor(
    private storage: StorageService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.persona = { nombre: "", apellido: "", idFacilitadores: [] };
    this.foto = "../../assets/images/persona-secondary.png";
  }

  ngOnInit() {}

  ionViewWillEnter() {
    var id = this.activatedRoute.snapshot.paramMap.get("idFeedback");
    this.loadFeedback(id);
  }

  loadPersona(idPersona) {
    this.storage.getPersona(idPersona).then((value) => {
      this.persona = value;
      if (this.persona.foto != "") {
        this.storage
          .getFileFromStorage(
            "/Personas/" + this.persona.id + "_profile_pic." + this.persona.foto
          )
          .then((url) => {
            this.foto = this.persona.foto = url;
          });
      }
    });
  }

  loadFeedback(idFeedback) {
    this.storage.getFeedback(idFeedback).then((value) => {
      this.feedback = value;
      this.loadPersona(value.idPersona);
      if (this.feedback.video != "") {
        this.storage
          .getFileFromStorage(
            "/Feedbacks/" + this.feedback.id + "/video." + this.feedback.video
          )
          .then((url) => {
            this.videoSrc = [url];
          });
      }
      if (this.feedback.audio != "") {
        this.storage
          .getFileFromStorage(
            "/Feedbacks/" + this.feedback.id + "/audio." + this.feedback.audio
          )
          .then((url) => {
            this.audioSrc = [url];
          });
      }
    });
  }

  getFoto() {
    if (this.feedback.satisfaccion != -1)
      return this.caras[this.feedback.satisfaccion - 1];
    else return this.transparent;
  }

  getMuchoTexto() {
    return this.feedback.comentario;
  }
}
