import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-codigofacilitador',
  templateUrl: './codigofacilitador.page.html',
  styleUrls: ['./codigofacilitador.page.scss'],
})
export class CodigofacilitadorPage implements OnInit {

  constructor(private storage: StorageService, public loadingController: LoadingController, private router: Router, public alertController: AlertController) { }

  public username = "";
  public contrasena = "";

  ngOnInit() {
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
      duration: 200
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async alertError(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  enviar(){
    this.presentLoading().then(response => {
      this.storage.loginAdmin(this.username, this.contrasena).then(result =>{
        if(result){
          this.router.navigateByUrl('/menuadministrador');
        }
        else {
          this.storage.loginFacilitador(this.username, this.contrasena).then(result2 =>{
            if(result2){
              this.router.navigateByUrl('/menufacilitador');
            }
            else {
              this.alertError("Usuario y/o contraseña incorrectos")
            }
          })
        }
      })
    })



/*
    console.log(this.username)
    this.presentLoading()
    .then(response => {
      if(this.username == "facilitador")
        this.router.navigateByUrl('/menufacilitador');
      else if(this.username == "administrador")
        this.router.navigateByUrl('/menuadministrador');
      else if(this.username == "")
        this.alertError("Campos vacios")
      else this.alertError("Usuario o contraseña incorrectos")
    })*/
  }
}
