import { Component, OnInit } from '@angular/core';
import { Entrega, StorageService } from "../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: 'app-infoentrega',
  templateUrl: './infoentrega.page.html',
  styleUrls: ['./infoentrega.page.scss'],
})
export class InfoentregaPage implements OnInit {

  entrega: Entrega = <Entrega>{};
  fechaEntrega
  foto
  ejercicio
  videoSrc = [];
  audioSrc = [];
  mediaBlob;
  idPersona
  source

  constructor(
    private storage: StorageService,
    private router: Router,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.foto="../../assets/images/default-pic.png"
    this.ejercicio = { nombre: "", enunciado: ""}
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadEntrega()
  }

  loadEntrega(){
    var id = parseInt(this.activatedRoute.snapshot.paramMap.get("idEntrega"));
    this.storage.getEntrega(id).then(value => {
      this.entrega = value
      this.fechaEntrega = new Date(value.fechaEntrega).toDateString()
      
      this.loadEjercicio();
    });
  }

  loadEjercicio() {
    this.storage.getEjercicio(this.entrega.idEjercicio).then(value => {
      this.ejercicio = value
      if (this.ejercicio.foto != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ this.ejercicio.id +"/foto."+ this.ejercicio.foto).then(url =>{
          this.foto = this.ejercicio.foto = url
        })
      }
      if (this.entrega.video != "") {
        this.storage.getFileFromStorage("/Entregas/"+ this.entrega.idPersona +"/"+ this.ejercicio.id +"/video."+ this.entrega.video).then(url =>{
          this.videoSrc = [url]
        })
      }
      if (this.entrega.audio != "") {
        this.storage.getFileFromStorage("/Entregas/"+ this.entrega.idPersona +"/"+ this.ejercicio.id +"/audio."+ this.entrega.audio).then(url =>{
          this.audioSrc = [url]
        })
      }

    });
  }

  goBack(){
    this.router.navigateByUrl('/infoejercicio/'+ this.ejercicio.id);
  }

}

