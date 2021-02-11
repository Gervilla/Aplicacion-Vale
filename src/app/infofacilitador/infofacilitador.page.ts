import { Component, OnInit } from '@angular/core';
import { StorageService } from "../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-infofacilitador',
  templateUrl: './infofacilitador.page.html',
  styleUrls: ['./infofacilitador.page.scss'],
})
export class InfofacilitadorPage implements OnInit {
  facilitador
  personas = [];
  foto
  public index = 0;
  public todos = [];


  constructor( private storage: StorageService, public alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.facilitador = {nombre:"", apellido:"", correo:"", contrasena:""}
    this.foto = "../../assets/images/persona-secondary.png"
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadFacilitador()
  }

  loadFacilitador(){
    var id = this.activatedRoute.snapshot.paramMap.get("idFacilitador");
    this.storage.getFacilitador(id).then(value =>{
      this.facilitador = value
      if (this.facilitador.foto != "") {
        this.storage.getFileFromStorage("/Facilitadores/"+ this.facilitador.id +"_profile_pic."+ this.facilitador.foto).then(url =>{
          this.foto = this.facilitador.foto = url
        })
      }
      this.loadPersonas()
    })
  }

  loadPersonas(){
    this.personas = []
    this.storage.getPersonasByFacilitador(this.facilitador.id).then(values=>{
      values.sort(function(a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
      })
      values.forEach(value =>{
        this.personas.push({
          id: value.id,
          fullname: value.nombre+ " " + value.apellido
        })
      });
    });
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.personas = this.todos;
    } else {
      this.index = 0;
      this.personas = this.todos.filter((currentPersona) => {
        if (currentPersona.fullname && searchTerm) {
          return (
            currentPersona.fullname
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        }
      });
    }
  }


  goToEdit(){
    console.log("eee")
    this.router.navigateByUrl("/aniadirfacilitador/"+ this.facilitador.id);
  }
}
