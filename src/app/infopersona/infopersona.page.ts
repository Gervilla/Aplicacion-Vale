import { Component, OnInit } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-infopersona",
  templateUrl: "./infopersona.page.html",
  styleUrls: ["./infopersona.page.scss"],
})
export class InfopersonaPage implements OnInit {
  persona;
  facilitadores = [];
  foto;
  
  esFacilitador = false; idFacilitador; grupos = []

  valoresCodigo = [-1, -1, -1];
  colores = [
    "light-green",
    "purple",
    "vale-orange",
    "vale-pink",
    "vale-secondary",
    "vale-yellow",
  ];
  images = [
    "oveja.png",
    "gato.png",
    "leon.png",
    "cerdo.png",
    "tortuga.png",
    "zorro.png",
  ];
  imgPath = "../../assets/images/animales/";
  imgBlank = "../../assets/images/transparent.png";

  constructor(
    private storage: StorageService,
    public alertController: AlertController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.persona = { nombre: "", apellido: "", idFacilitadores: [] };
    this.foto = "../../assets/images/persona-secondary.png";
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadPersona();
  }

  loadPersona() {
    var id = this.activatedRoute.snapshot.paramMap.get("idPersona");
    this.storage.getPersona(id).then((value) => {
      this.persona = value;
      if (this.persona.foto != "") {
        this.storage.getFileFromStorage("/Personas/" + this.persona.id + "_profile_pic." + this.persona.foto).then((url) => {
          this.foto = this.persona.foto = url;
        });
      }
      this.storage.getUsuarioActivo().then((value) => {
        if (value) {
          if (value.tipo == "facilitador") {
            this.esFacilitador = true;
            this.idFacilitador = value.id
            this.loadGrupos();
          } else {
            this.loadFacilitadores();
            this.obtenerPatronCodigo();
          }
        }
      });
    });
  }

  obtenerPatronCodigo() {
    let animales = ["o", "g", "l", "c", "t", "z"];
    for (var i = 0; i < 3; ++i) {
      this.valoresCodigo[i] = animales.findIndex(
        (element) => element == this.persona.codigo[i]
      );
    }
  }

  loadFacilitadores() {
    this.facilitadores = [];
    this.storage.getFacilitadores().then((values) => {
      values.sort(function (a, b) {
        if (a.nombre < b.nombre) { return -1 }
        if (a.nombre > b.nombre) { return  1 }
        return 0;
      });
      values.forEach((value) => {
        if (this.persona.idFacilitadores.findIndex((element) => element == value.id) != -1)
          this.facilitadores.push({
            id: value.id,
            fullname: value.nombre + " " + value.apellido,
          });
      });
    });
  }

  loadGrupos() {
    this.grupos = []
    this.storage.getGrupos(this.idFacilitador).then((values) =>{
      values.sort(function (a, b) {
        if (a.nombre < b.nombre) { return -1 }
        if (a.nombre > b.nombre) { return  1 }
        return 0;
      })
      values.forEach((value) => {
        if (value.idPersonas.findIndex((element) => element == this.persona.id) != -1)
          this.grupos.push({
            id: value.id,
            nombre: value.nombre
          });
      })
    })
  }

  Color1() {
    if (this.valoresCodigo[0] == -1) {
      return "white";
    }
    return this.colores[this.valoresCodigo[0]];
  }
  Imagen1() {
    if (this.valoresCodigo[0] == -1) {
      return this.imgBlank;
    }
    return this.imgPath + this.images[this.valoresCodigo[0]];
  }

  Color2() {
    if (this.valoresCodigo[1] == -1) {
      return "white";
    }
    return this.colores[this.valoresCodigo[1]];
  }
  Imagen2() {
    if (this.valoresCodigo[1] == -1) {
      return this.imgBlank;
    }
    return this.imgPath + this.images[this.valoresCodigo[1]];
  }

  Color3() {
    if (this.valoresCodigo[2] == -1) {
      return "white";
    }
    return this.colores[this.valoresCodigo[2]];
  }
  Imagen3() {
    if (this.valoresCodigo[2] == -1) {
      return this.imgBlank;
    }
    return this.imgPath + this.images[this.valoresCodigo[2]];
  }

  goToEdit() {
    console.log("eee");
    this.router.navigateByUrl("/aniadirpersona/" + this.persona.id);
  }

  goBack() {
    this.router.navigateByUrl(
      this.esFacilitador ? "/personasasignadas" : "/gestionpersona"
    );
  }
}
