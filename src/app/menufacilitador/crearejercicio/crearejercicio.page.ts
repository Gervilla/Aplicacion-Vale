import { Component, OnInit } from "@angular/core";
import { Ejercicio, StorageService } from "../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-crearejercicio",
  templateUrl: "./crearejercicio.page.html",
  styleUrls: ["./crearejercicio.page.scss"],
})
export class CrearejercicioPage implements OnInit {
  ejercicio: Ejercicio = <Ejercicio>{};
  grupos = [];
  grupo
  editar = false;

  videoSrc = []; audioSrc = [];
  fotoBuffer;
  fotoBlob; mediaBlob;
  
  inicio;
  final;
  constructor(
    private storage: StorageService,
    public alertController: AlertController,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.inicio = new Date().toDateString();
    this.final = new Date(new Date().setHours(5 * 24)).toDateString();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.getUsuarioActivo().then((value) => {
      if (value) {
        if (value.tipo == "facilitador") {
          this.ejercicio.idFacilitador = value.id
          this.loadGrupos(value.id);
        }
      } else this.router.navigateByUrl("/");
    });
  }

  loadEjercicio(idEjercicio) {
    var id = parseInt(idEjercicio);
    this.storage.getEjercicio(id).then(value => {
      this.ejercicio = value
      this.inicio = this.ejercicio.fechaInicio
      this.final = this.ejercicio.fechaFinal
      var indexGrupo = this.grupos.findIndex( element => element.id == this.ejercicio.idGrupo)
      this.grupo = this.grupos[indexGrupo]
      if (this.ejercicio.foto != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/foto."+ this.ejercicio.foto).then(url =>{
          this.fotoBuffer = url
        })
      }
      if (this.ejercicio.video != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/video."+ this.ejercicio.video).then(url =>{
          this.videoSrc = [url]
        })
      }
      else if (this.ejercicio.audio != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/audio."+ this.ejercicio.audio).then(url =>{
          this.audioSrc = [url]
        })
      }
    });
  }

  async loadGrupos(idFacilitador) {
    this.grupos = []
    await this.storage.getGrupos(idFacilitador).then((values) => {
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
        this.grupos.push({
          id: value.id,
          nombre: value.nombre
        })
      })
    })
    var idEjercicio = this.activatedRoute.snapshot.paramMap.get("idEjercicio");
    if(idEjercicio!="nuevo"){
      this.editar = true
      this.loadEjercicio(idEjercicio)
    }
  }

  comprobar() {
    let dateInicio = new Date(this.inicio);
    let dateFinal = new Date(this.final);
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (
      this.ejercicio.nombre == undefined ||
      this.ejercicio.enunciado == undefined
    ) {
      this.alert("Error", "Debe de rellenar todos los campos");
    } else if (this.grupo.id == -1) {
      this.alert("Error", "No se ha seleccionado el grupo");
    } else if (dateInicio.getTime() < hoy.getTime()) {
      this.alert("Error", "La fecha de inicio es anterior a la fecha actual");
    } else if (dateFinal.getTime() < dateInicio.getTime()) {
      this.alert(
        "Error",
        "La fecha de fin no puede ser anterior a la fecha de inicio"
      );
    } else return true;

    return false;
  }

  convertDateString(ionic_date : string){
    return new Date(ionic_date).toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
  }

  submit(esBorrador: boolean) {
    this.ejercicio.borrador = esBorrador;
    this.ejercicio.idGrupo = this.grupo.id;
    this.ejercicio.fechaInicio = this.convertDateString(this.inicio);
    this.ejercicio.fechaFinal = this.convertDateString(this.final);
    if (!this.editar) {
      this.ejercicio.foto = "";
      this.ejercicio.video = "";
      this.ejercicio.audio = "";
      this.storage.addEjercicio(this.ejercicio, this.fotoBlob, this.mediaBlob).then((value) => {
        if (value) {
          this.alertSuccess();
        } else {
          this.alert("Error", "Este nombre ya lo tiene otro ejercicio");
        }
      });
    } else {
      this.storage.editEjercicio(this.ejercicio.id, this.ejercicio, this.fotoBlob, this.mediaBlob)
        .then((value) => {
          if (value) this.alertSuccess();
          else
            this.alert(
              "Error",
              "No se puede cambiar porque este nombre ya lo tiene otro ejercicio"
            );
        });
    }
  }

  async alertEnviar() {
    const actionSheet = await this.actionSheetController.create({
      header: "¿Que quiere hacer con el ejercicio?",
      buttons: [
        {
          text: "Enviar a Personas",
          icon: "send",
          handler: () => {
            this.submit(false);
          },
        },
        {
          text: "Guardar como Borrador",
          icon: "document",
          handler: () => {
            this.submit(true);
          },
        },
        {
          text: "Cancelar",
          icon: "close-circle",
          handler: () => {},
        },
      ],
    });
    if (this.comprobar()) {
      await actionSheet.present();
    }
  }

  cambiarFoto(event) {
    var re = /(\.jpg|\.jpeg|\.png)$/i
    if (!re.exec(event.target.files[0].name)) {
      this.alert("Error", "No es un archivo de imagen valido");
      this.fotoBlob = undefined;
    } else {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.fotoBuffer = reader.result;
      };
      reader.readAsDataURL(event.target.files[0])
      this.fotoBlob = event.target.files[0]
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

  getFoto() {
    if (this.fotoBuffer) {
      return this.fotoBuffer;
    } else {
      return "../../../../assets/images/default-pic.png";
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
      message: "Ejercicio registrado con exito",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/listaejercicios");
          },
        },
      ],
    });
    await alert.present();
  }

 

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;
}
