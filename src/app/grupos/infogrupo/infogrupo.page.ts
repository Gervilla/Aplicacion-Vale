import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-infogrupo',
  templateUrl: './infogrupo.page.html',
  styleUrls: ['./infogrupo.page.scss'],
})
export class InfogrupoPage implements OnInit {
  grupo
  personas = [];
  foto
  idFacilitador

  constructor( private storage: StorageService, public alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.grupo = {nombre:""}
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "facilitador"){
          this.idFacilitador = value.id
          this.loadGrupo()
        }
      }
      else this.router.navigateByUrl('/');
    })
  }

  loadGrupo(){
    var id = this.activatedRoute.snapshot.paramMap.get("idGrupo");
    this.storage.getGrupo(this.idFacilitador,id).then(value =>{
      this.grupo = value
      this.loadPersonas()
    })
  }

  loadPersonas(){
    this.personas = []
    this.storage.getPersonas().then(values=>{
      values.sort(function(a, b){
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
      })
      values.forEach(value =>{
        if(this.grupo.idPersonas.findIndex(element => element == value.id) != -1){
          this.personas.push({
            id: value.id,
            fullname: value.nombre+ " " + value.apellido
          })
        }
      })
    })
  }

  goToEdit(){
    console.log("eee")
    this.router.navigateByUrl("/creargrupo/"+ this.grupo.id);
  }
}
