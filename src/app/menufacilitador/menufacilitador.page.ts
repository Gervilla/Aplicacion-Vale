import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menufacilitador',
  templateUrl: './menufacilitador.page.html',
  styleUrls: ['./menufacilitador.page.scss'],
})
export class MenufacilitadorPage implements OnInit {

  facilitador = { nombre: "" }

  constructor(private storage: StorageService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "facilitador"){
          this.facilitador = value
        }
      }
      else this.router.navigateByUrl('/');
    })
  }

  async alertSalir() {
    const alert = await this.alertController.create({
      header: '¿Cerrar Sesion?',
      //message: '',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.storage.logout();
            this.router.navigateByUrl('/');
          }
        }
      ]
    });
    await alert.present();
  }

  
}
