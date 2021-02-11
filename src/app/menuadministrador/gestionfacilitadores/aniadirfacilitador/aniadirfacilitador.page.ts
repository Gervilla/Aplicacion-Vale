import { Component, OnInit } from '@angular/core';
import { Facilitador, StorageService} from 'src/app/services/storage.service';
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-aniadirfacilitador',
  templateUrl: './aniadirfacilitador.page.html',
  styleUrls: ['./aniadirfacilitador.page.scss'],
})
export class AniadirfacilitadorPage implements OnInit {

  facilitador: Facilitador = <Facilitador>{};
  fotoBuffer; blob
  contrasena2
  
  editar = false
  default_pic = "../../../../assets/images/persona-secondary.png"

  idParam

  constructor(private storage: StorageService, private router: Router, public alertController: AlertController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  ionViewWillEnter(){
    var id = this.activatedRoute.snapshot.paramMap.get("idFacilitador");
    if(id!="nuevo"){
      this.editar = true
      this.loadFacilitador(id)
    }
  }

  loadFacilitador(id){
    this.storage.getFacilitador(id).then(value =>{
      this.facilitador = value
      this.contrasena2 = value.contrasena
      if (this.facilitador.foto != "") {
        this.storage.getFileFromStorage("/Facilitadores/"+ this.facilitador.id +"_profile_pic."+ this.facilitador.foto).then(url =>{
          this.fotoBuffer = url
        })
      }
    })
  }

  
  submit() {
    if (this.comprobar()) {
      if(!this.editar){
        this.facilitador.foto = "";
        this.storage.addFacilitador(this.facilitador,this.blob).then((value) => {
          if (value)
            this.alertSuccess();
          else
            this.alert("Error", "Este correo ya esta registrado");
        })
      }
      else{
        this.storage.editFacilitador(this.facilitador.id,this.facilitador,this.blob).then((value) => {
          if (value)
            this.alertSuccess();
          else 
            this.alert("Error", "No se puede cambiar a este correo porque ya esta registrado");
        })
      }
    }
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
      return this.default_pic
    }
  }

  comprobar() {
    if (
      this.facilitador.nombre == undefined ||
      this.facilitador.apellido == undefined ||
      this.facilitador.correo == undefined ||
      this.facilitador.contrasena == undefined ||
      this.contrasena2 == undefined
    ) {
      this.alert("Error", "Debe de rellenar todos los campos");
    }
    else if (this.facilitador.contrasena != this.contrasena2){
      this.alert("Error", "Las contraseñas no coinciden");
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
      message: "Facilitador " +((this.editar)? "modificado":"registrado")+ " con exito",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/gestionfacilitador");
          },
        },
      ],
    });
    await alert.present();
  }

}
