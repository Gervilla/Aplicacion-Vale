import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {


  constructor(private storage: StorageService, private router: Router, public actionSheetController: ActionSheetController, private activatedRoute: ActivatedRoute) { }

  public index = 0;
  public empty = "../../assets/images/default-pic2.png";
  esCalendario = false
  waiting = true
  titulo = ""

  public ejercicios = []
  colores =["vale-secondary","vale-pink","purple","vale-orange"]
  semanaStr = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"]


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "persona"){
          this.loadEjercicios(value.id);
        }
        else this.router.navigateByUrl('/');
      }
      else this.router.navigateByUrl('/');
    })
  }

  async loadEjercicios(idPersona) {
    var fecha = this.activatedRoute.snapshot.paramMap.get("fecha")
    var ndia = 0
    var dia = new Date(new Date().setUTCHours(0,0,0,0))
    var index = this.semanaStr.findIndex(value => value == fecha)

    if(index != -1){
      var numeroDia = (dia.getDay()+6)%7
      dia.setUTCHours((index-numeroDia)*24)
      this.titulo = this.semanaStr[index][0].toUpperCase() + this.semanaStr[index].substring(1,this.semanaStr[index].length)
      console.log(numeroDia+" --- "+dia)
      this.esCalendario = true
    }
    else{
      switch(fecha){
        case "0":
          this.titulo = "Hoy"; break;
        case "1":
          this.titulo = "Mañana"; break;
        default:
          this.titulo = "En "+ fecha +" dias"; break;
      }
      ndia = parseInt(fecha)
      dia.setUTCHours(ndia*24)
    }

    var colorCount = 0
    this.ejercicios = [];
    let values = await this.storage.getEjerciciosPendientes(idPersona,true)
    values.sort(function(a, b){
      if(a.nombre < b.nombre) { return -1; }
      if(a.nombre > b.nombre) { return 1; }
      return 0;
    })
    values.forEach((value) => {
      var inicio = new Date(value.fechaInicio).getTime()
      var final = new Date(value.fechaFinal).getTime()
      
      if(dia.getTime() == inicio || (ndia==0 && dia.getTime() >= inicio && dia.getTime() <= final)){
        this.ejercicios.push({ 
          id: value.id,
          nombre: value.nombre,
          color: this.colores[colorCount],
          icono: this.empty
        })
        if (value.foto != "") {
          let i = this.ejercicios.length - 1;
          this.storage.getFileFromStorage("/Ejercicios/"+ value.id +"/foto."+ value.foto).then(url =>{
            this.ejercicios[i].icono = url
          })
        }
        colorCount=(colorCount+1)%this.colores.length
      }
    });
    this.waiting = false
  }

  getText1(){
    if(this.index<this.ejercicios.length)
      return this.ejercicios[this.index].nombre;
    else return "";
  }
  getIcon1(){
    if(this.index<this.ejercicios.length)
      return this.ejercicios[this.index].icono;
    else return this.empty;
  }
  getColor1(){
    if(this.index<this.ejercicios.length)
      return this.ejercicios[this.index].color;
    else return "white";
  }
  isHidden1(){
    return this.index>=this.ejercicios.length;
  }

  getText2(){
    if(this.index+1<this.ejercicios.length)
      return this.ejercicios[this.index+1].nombre;
    else return "";
  }
  getIcon2(){
    if(this.index+1<this.ejercicios.length)
      return this.ejercicios[this.index+1].icono;
    else return this.empty;
  }
  getColor2(){
    if(this.index+1<this.ejercicios.length)
      return this.ejercicios[this.index+1].color;
    else return "white";
  }
  isHidden2(){
    return this.index+1>=this.ejercicios.length;
  }

  getText3(){
    if(this.index+2<this.ejercicios.length)
      return this.ejercicios[this.index+2].nombre;
    else return "";
  }
  getIcon3(){
    if(this.index+2<this.ejercicios.length)
      return this.ejercicios[this.index+2].icono;
    else return this.empty;
  }
  getColor3(){
    if(this.index+2<this.ejercicios.length)
      return this.ejercicios[this.index+2].color;
    else return "white";
  }
  isHidden3(){
    return this.index+2>=this.ejercicios.length;
  }

  nextPage(){
    this.index++;
  }
  previousPage(){
    this.index--;
  }

  isPButtonDisable(){
    return this.index<=0;
  }
  isNButtonDisable(){
    return this.index>=this.ejercicios.length-3;
  }

  opciones1() {
    this.opcionesPersonas(0);
  }

  opciones2() {
    this.opcionesPersonas(1);
  }

  opciones3() {
    this.opcionesPersonas(2);
  }

  opcionesPersonas(boton) {
    this.router.navigateByUrl("/ejercicio/"+ this.ejercicios[this.index + boton].id);
  }

  goBack() {
    this.router.navigateByUrl(
      (this.esCalendario)? "/calendario" : "/fecha"
    );
  }

  getNoneMsg(){
    return this.waiting || (this.ejercicios.length != 0)
  }
}
