import { Component, OnInit } from "@angular/core";
import { StorageService, Grupo } from "../../services/storage.service";
import { ActionSheetController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-creargrupo",
  templateUrl: "./creargrupo.page.html",
  styleUrls: ["./creargrupo.page.scss"],
})
export class CreargrupoPage implements OnInit {
  seleccionarPersonas = false;
  idFacilitador = -1;
  editar = false

  grupo: Grupo = <Grupo>{};

  personas = []
  indexPersonas = []

  empty = "../../assets/images/persona-secondary.png";

  constructor(
    private storage: StorageService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.personas = []
    this.storage.getUsuarioActivo().then((value) => {
      if (value) {
        if (value.tipo == "facilitador") {
          var idGrupo = this.activatedRoute.snapshot.paramMap.get("idGrupo");
          this.idFacilitador = value.id;
          if(idGrupo!="nuevo"){
            this.editar = true
            this.loadGrupo(idGrupo);
          }
          else this.loadPersonas();
        }
      } else this.router.navigateByUrl("/");
    });
  }

  loadGrupo(id){
    this.storage.getGrupo(this.idFacilitador,id).then(value =>{
      this.grupo = value
      this.loadPersonas()
    })
  }

  loadPersonas() {
    this.personas = []
    this.indexPersonas = []
    this.storage.getPersonasByFacilitador(this.idFacilitador).then((values) => {
      values.sort(function(a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
      })
      values.forEach((value) => {
          this.personas.push({
          id: value.id,
          fullname: value.nombre + " " + value.apellido,
          foto: this.empty,
          isChecked: false,
        });
        let i = this.personas.length - 1;
        
        if(this.editar){
          if (this.grupo.idPersonas.findIndex((element) => element == value.id) != -1){
            this.personas[i].isChecked = true
          }
        }

        this.indexPersonas.push(i)
        if (value.foto != "") {
          this.storage.getFileFromStorage("/Personas/"+ value.id +"_profile_pic."+ value.foto).then(url =>{
            this.personas[i].foto = url
          })
        }
      });
    });
  }

  cambiarVentana() {
    this.seleccionarPersonas = !this.seleccionarPersonas;
  }

  registrar() {
    if (this.grupo.nombre == undefined){
      this.alert("Error", "No se ha asignado ningun nombre al grupo");
    } 
    else{
      let personasIDs = this.getPersonasEnGrupo()
      if(personasIDs.length == 0){
        this.alert("Error", "No se ha seleccionado ninguna persona");
      }
      else{
        this.grupo.idFacilitador = this.idFacilitador
        this.grupo.idPersonas = personasIDs
        if(!this.editar){
          this.storage.addGrupo(this.grupo).then((value) => {
            if (value) {
              this.alertSuccess();
            } else {
              this.alert("Error", "Ya existe un grupo con el nombre: " + this.grupo.nombre);
            }
          })
        }
        else{
          this.storage.editGrupo(this.grupo.id, this.grupo).then((value) => {
            if (value) {
              this.alertSuccess();
            } else {
              this.alert("Error", "No se ha podido modificar el grupo porque ya existe otro con este nombre");
            }
          })
        }
      }
    }
  }

  getPersonasEnGrupo(){
    let personasIDs = []
    for (let i of this.personas) {
      if (i.isChecked) {
        personasIDs.push(i.id)
      }
    }
    return personasIDs
  }

  async filterList(evt) {
    this.indexPersonas = []
    var searchTerm = evt.srcElement.value
    if (!searchTerm) {
      searchTerm.toLowerCase();
    }
    for(var i=0; i<this.personas.length; ++i){
      if(this.personas[i].fullname.toLowerCase().indexOf(searchTerm) > -1)
        this.indexPersonas.push(i)
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
      message: "Grupo creado con éxito",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/grupos");
          },
        },
      ],
    });
    await alert.present();
  }
}
