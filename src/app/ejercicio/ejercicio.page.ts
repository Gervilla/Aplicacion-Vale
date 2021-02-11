import { Component, OnInit } from '@angular/core';
import { StorageService } from "../services/storage.service";
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.page.html',
  styleUrls: ['./ejercicio.page.scss'],
})
export class EjercicioPage implements OnInit {
  foto
  ejercicio
  videoSrc = []; audioSrc = [];
  semanaStr = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"]

  constructor(private storage: StorageService, private router: Router, public actionSheetController: ActionSheetController, private activatedRoute: ActivatedRoute) {
    this.foto="../../assets/images/default-pic.png"
    this.ejercicio = { nombre: "", enunciado: ""}
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "persona"){
          this.loadEjercicio();
        }
        else this.router.navigateByUrl('/');
      }
      else this.router.navigateByUrl('/');
    })
  }

  loadEjercicio() {
    this.videoSrc = []
    this.audioSrc = [];
    var id = parseInt(this.activatedRoute.snapshot.paramMap.get("idEjercicio"));
    this.storage.getEjercicio(id).then(value => {
      this.ejercicio = value
      if (this.ejercicio.foto != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/foto."+ this.ejercicio.foto).then(url =>{
          this.foto = this.ejercicio.foto = url
        })
      }
      if (this.ejercicio.video != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/video."+ this.ejercicio.video).then(url =>{
          this.videoSrc.push(url)
        })
      }
      if (this.ejercicio.audio != "") {
        this.storage.getFileFromStorage("/Ejercicios/"+ id +"/audio."+ this.ejercicio.audio).then(url =>{
          this.audioSrc.push(url)
        })
      }
    });
  }

  goToEntrega(){
    this.router.navigateByUrl('/entregaejercicio/'+ this.ejercicio.id);
  }
}
