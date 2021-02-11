import { Component, OnInit } from '@angular/core';
import { Entrega, StorageService } from "../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: 'app-entregaejercicio',
  templateUrl: './entregaejercicio.page.html',
  styleUrls: ['./entregaejercicio.page.scss'],
})
export class EntregaejercicioPage implements OnInit {
  entrega: Entrega = <Entrega>{};
  foto
  ejercicio
  videoSrc = []; audioSrc = [];
  mediaBlob;
  idPersona


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
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "persona"){
          this.idPersona = value.id
          this.loadEjercicio();
        }
        else this.router.navigateByUrl('/');
      }
      else this.router.navigateByUrl('/');
    })
  }

  loadEjercicio() {
    var id = parseInt(this.activatedRoute.snapshot.paramMap.get("idEjercicio"));
    this.storage.getEjercicio(id).then(value => {
      this.ejercicio = value
      if (this.ejercicio.foto != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/foto."+ this.ejercicio.foto).then(url =>{
          this.foto = this.ejercicio.foto = url
        })
      }
    });
  }

  goBack(){
    this.router.navigateByUrl('/ejercicio/'+ this.ejercicio.id);
  }
  cambiarMedia(event) {
    var re = /(\.mp4|\.mpeg|\.mp3|\.wav|\.ogg)$/i
    var reAudio = /(\.mpeg|\.mp3|\.wav|\.ogg)$/i
    var filename = event.target.files[0].name
    if (!re.exec(filename)) {
      this.alert("Error", "No es un archivo de video o audio valido");
    } else {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        var result = reader.result
        this.videoSrc = []
        this.audioSrc = []
        if(!reAudio.exec(filename))
          this.videoSrc = [reader.result]
        else {
          this.audioSrc = [this.sanitizer.bypassSecurityTrustResourceUrl(stringify(result))]
        }
      };
      reader.readAsDataURL(event.target.files[0]);
      this.mediaBlob = event.target.files[0]
    }
  }
  async alert(titulo, msg) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      message: "Ejercicio enviado con exito",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/menupersona");
          },
        },
      ],
    });
    await alert.present();
  }

  async alertEnviar() {
    const alert = await this.alertController.create({
      header: '¿Quiere enviar este ejercicio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Si',
          handler: () => {
            this.enviarEntrega()
          }
        }
      ]
    });
    await alert.present();
  }

  convertDateString(date : Date){
    return date.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
  }

  comprobar() {
    if (this.entrega.respuesta != undefined || this.mediaBlob) {
      return true;
    } 
    else{
      this.alert("Error", "Debe de rellenar todos los campos");
      return false;
    }
  }

  enviarEntrega(){
    if (this.comprobar()){
      this.entrega.fechaEntrega = this.convertDateString(new Date);
      this.entrega.video = "";
      this.entrega.audio = "";
      this.entrega.idEjercicio = this.ejercicio.id
      this.entrega.idPersona = this.idPersona
      this.storage.addEntrega(this.entrega, this.mediaBlob).then((value) => {
        if (value) {
          this.alertSuccess();
        } else {
          this.alert("Error", "Algo ha ocurrido");
        }
      })
    }
  }
}