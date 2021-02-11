import { Component, OnInit } from '@angular/core';
import { FeedbackGeneral, StorageService } from "../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  public contadores = ["false","false","false","false","false"];
  public colores =["Transparent","Transparent","Transparent","Transparent","Transparent"];
  feedback: FeedbackGeneral = <FeedbackGeneral>{}
  videoSrc = []; audioSrc = [];
  mediaBlob;


  constructor(
    private storage: StorageService,
    public alertController: AlertController,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.getUsuarioActivo().then((value) => {
      this.feedback.idPersona = value.id;
      console.log(value.id)
    });
  }

  ponerColor(num){
    if ( this.contadores[num] == "false" ){
      for ( var i=0; i<this.contadores.length; i++ ){
        if( this.contadores[i] == "true" ){
          this.contadores[i] = "false";
          this.colores[i] = "Transparent";
        }
      }
      this.feedback.satisfaccion = num + 1;
      this.contadores[num] = "true";
      this.colores[num] = "vale-secondary";
    }
    else if ( this.contadores[num] == "true" ){
      this.contadores[num] = "false";
      this.colores[num] = "Transparent";
    }
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
  submit() {
    this.feedback.video = "";
    this.feedback.audio = "";
    this.storage.addFeedback(this.feedback, this.mediaBlob).then((value) => {
        this.alertSuccess();
    });
  }
  async alertSuccess() {
    const alert = await this.alertController.create({
      message: "Feedback registrado con exito",
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
  async alert(titulo, msg) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
}