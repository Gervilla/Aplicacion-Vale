import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menupersona',
  templateUrl: './menupersona.page.html',
  styleUrls: ['./menupersona.page.scss'],
})
export class MenupersonaPage implements OnInit {

  persona = { nombre: "" }

  constructor(private storage: StorageService, public alertController: AlertController, private router: Router) {  }
  
  ngOnInit() {  }

  ionViewWillEnter(){
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        if(value.tipo == "persona"){
          this.persona = value
        }
      }
      else this.router.navigateByUrl('/');
    })
  }

  async alertSalir() {
    const alert = await this.alertController.create({
      header: '¿Cerrar Sesion?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Si',
          handler: () => {
            this.storage.logout()
            this.router.navigateByUrl('/');
          }
        }
      ]
    });
    await alert.present();
  }

}
