import { Component, OnInit } from "@angular/core";
import { Persona, StorageService } from "../../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-aniadirpersona",
  templateUrl: "./aniadirpersona.page.html",
  styleUrls: ["./aniadirpersona.page.scss"],
})
export class AniadirpersonaPage implements OnInit {
  persona: Persona = <Persona>{};
  editar = false;
  fotoBuffer; blob;

  seleccionarFacilitadores = false;
  indexFacilitadores = [];
  facilitadores = [];
  empty = "../../../assets/images/persona-secondary.png";

  valoresCodigo = [-1,-1,-1];
  colores = ["light-green","purple","vale-orange","vale-pink","vale-secondary","vale-yellow"]
  images = ["oveja.png","gato.png","leon.png","cerdo.png","tortuga.png","zorro.png"]
  imgPath = "../../../../assets/images/animales/"
  imgBlank = "../../../../assets/images/transparent.png"

  constructor( private storage: StorageService, public alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.facilitadores = []
    var id = this.activatedRoute.snapshot.paramMap.get("idPersona");
    if(id!="nuevo"){
      this.editar = true
      this.loadPersona(id)
    }
    else{
      this.generarCodigo()
      this.loadFacilitadores()
    } 
  }

  loadPersona(id){
    this.storage.getPersona(id).then(value =>{
      this.persona = value
      if (this.persona.foto != "") {
        this.storage.getFileFromStorage("/Personas/"+ this.persona.id +"_profile_pic."+ this.persona.foto).then(url =>{
          this.fotoBuffer = url
        })
      }
      this.loadFacilitadores()
      this.obtenerPatronCodigo()
    })
  }

  obtenerPatronCodigo(){
    let animales = ["o", "g", "l", "c", "t", "z"];
    for(var i=0; i<3; ++i){
      this.valoresCodigo[i] = animales.findIndex(element => element == this.persona.codigo[i])
    }
  }

  cambiarVentana() {
    this.seleccionarFacilitadores = !this.seleccionarFacilitadores;
  }

  generarCodigo(){
    let animales = ["o","g","l","c","t","z"]
    this.storage.generarCodigo().then(numeros =>{
      this.valoresCodigo = numeros;
      this.persona.codigo = animales[numeros[0]]+animales[numeros[1]]+animales[numeros[2]]
    })
  }

  registrar() {
    if (this.comprobar()) {
      this.persona.idFacilitadores = this.facilitadoresSeleccionados()
      if(!this.editar){
        this.persona.foto = "";
        this.storage.addPersona(this.persona,this.blob).then((value) => {
          if (value) {
            this.alertSuccess();
          } else {
            this.alert("Error", "Este codigo ya esta en uso");
          }
        });
      }
      else{
        this.storage.editPersona(this.persona.id,this.persona,this.blob).then((value) => {
          if (value)
            this.alertSuccess();
          else 
            this.alert("Error", "No se puede cambiar a este codigo porque ya esta registrado");
        })
      }
      
    }
  }

  facilitadoresSeleccionados(){
    let IDs = []
    for (let i of this.facilitadores) {
      if (i.isChecked) {
        IDs.push(i.id)
      }
    }
    return IDs
  }

  changeListener(event){
    var re = /(\.jpg|\.jpeg|\.png)$/i;
    if (!re.exec(event.target.files[0].name)) {
      this.alert("Error", "No es un archivo de imagen valido");
      this.blob = undefined
    }
    else{
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.fotoBuffer = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.blob = event.target.files[0];
    }
  }

  getProfilePic(){
    if(this.fotoBuffer){
      return this.fotoBuffer;
    }
    else{
      return "../../../../assets/images/persona-secondary.png"
    }
  }

  comprobar() {
    if (
      this.persona.nombre == undefined ||
      this.persona.apellido == undefined ||
      this.persona.codigo == undefined
    ) {
      this.alert("Error", "Debe de rellenar todos los campos");
    }
    else if (this.facilitadoresSeleccionados().length == 0){
      this.alert("Error", "No se han seleccionado facilitadores");
    }
    else return true;

    return false;
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
      message: "Persona " +((this.editar)? "modificada":"registrada")+ " con exito",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/gestionpersona");
          },
        },
      ],
    });
    await alert.present();
  }

  loadFacilitadores(){
    this.facilitadores = []
    this.indexFacilitadores = []
    this.storage.getFacilitadores().then(values=>{
      values.sort(function(a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
      })
      values.forEach(value =>{
        this.facilitadores.push({
          id: value.id,
          fullname: value.nombre+ " " + value.apellido,
          foto: this.empty,
          isChecked: false,
        })
        let i = this.facilitadores.length - 1;

        if(this.editar){
          if (this.persona.idFacilitadores.findIndex((element) => element == value.id) != -1){
            this.facilitadores[i].isChecked = true
          }
        }

        this.indexFacilitadores.push(i)
        if (value.foto != "") {
          this.storage.getFileFromStorage("/Facilitadores/"+ value.id +"_profile_pic."+ value.foto).then(url =>{
            this.facilitadores[i].foto = url
          })
        }
      });
    });
  }

  Color1(){
    if(this.valoresCodigo[0] == -1){
      return "white";
    }
    return this.colores[this.valoresCodigo[0]];
  }
  Imagen1(){
    if(this.valoresCodigo[0] == -1){
      return this.imgBlank;
    }
    return this.imgPath +  this.images[this.valoresCodigo[0]];
  }

  Color2(){
    if(this.valoresCodigo[1] == -1){
      return "white";
    }
    return this.colores[this.valoresCodigo[1]];
  }
  Imagen2(){
    if(this.valoresCodigo[1] == -1){
      return this.imgBlank;
    }
    return this.imgPath +  this.images[this.valoresCodigo[1]];
  }

  Color3(){
    if(this.valoresCodigo[2] == -1){
      return "white";
    }
    return this.colores[this.valoresCodigo[2]];
  }
  Imagen3(){
    if(this.valoresCodigo[2] == -1){
      return this.imgBlank;
    }
    return this.imgPath +  this.images[this.valoresCodigo[2]];
  }

  reloadCodigo(){
    this.generarCodigo()
  }

  async filterList(evt) {
    this.indexFacilitadores = []
    var searchTerm = evt.srcElement.value
    if (!searchTerm) {
      searchTerm.toLowerCase();
    }
    for(var i=0; i<this.facilitadores.length; ++i){
      if(this.facilitadores[i].fullname.toLowerCase().indexOf(searchTerm) > -1)
        this.indexFacilitadores.push(i)
    }
  }

}
