import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Platform, ToastController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {

  public contador=0;
  public codigo="";

  public dibujos = ["../../assets/images/transparent.png","../../assets/images/transparent.png","../../assets/images/transparent.png"];
  public Animales = ["","",""];
  public Colores =["white","white","white"];

  constructor(private storage: StorageService, private plt: Platform, private toastController: ToastController, public loadingController: LoadingController, private router: Router, public alertController: AlertController) { 
    
    /*this.plt.ready().then(()=>{
      this.loadUsuarios();
    });*/
  }

  ngOnInit() {
  }
  
  enviar(){
    //Combinacion de las iniciales de los animales
    this.codigo = this.Animales[0]+this.Animales[1]+this.Animales[2];
    this.presentLoading().then(response => {
      this.storage.loginPersona(this.codigo).then(result =>{
        if(result){
          this.showToast("Codigo correcto")
          this.router.navigateByUrl('/menupersona');
        }
        else {
          this.alertError("Codigo incorrecto")
        }
        this.borrarColores()
      })
    })
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ponerOveja(){
    if(this.contador<3){
      this.dibujos[this.contador] ="../../assets/images/animales/oveja.png";
      this.Colores[this.contador] ="light-green"
      this.Animales[this.contador] = "o";
      this.contador++;
    }
    if(this.contador==3){
      this.enviar();
    }
  }

  ponerGato(){
    if(this.contador<3){
      this.Colores[this.contador] ="purple";
      this.dibujos[this.contador] ="../../assets/images/animales/gato.png";
      this.Animales[this.contador] = "g";
      this.contador++;
    }
    if(this.contador==3){
      this.enviar();
    }
  }

  ponerLeon(){
    if(this.contador<3){
      this.Colores[this.contador] ="vale-orange";
      this.dibujos[this.contador] ="../../assets/images/animales/leon.png";
      this.Animales[this.contador] = "l";
      this.contador++;
    }
    if(this.contador==3){
      this.enviar();
    }
  }

  ponerCerdo(){
    if(this.contador<3){
      this.Colores[this.contador] ="vale-pink";
      this.dibujos[this.contador] ="../../assets/images/animales/cerdo.png";
      this.Animales[this.contador] = "c";
      this.contador++;
    }
    if(this.contador==3){
      this.enviar();
    }
  }

  ponerTortuga(){
    if(this.contador<3){
      this.Colores[this.contador]="vale-secondary";
      this.dibujos[this.contador]="../../assets/images/animales/tortuga.png";
      this.Animales[this.contador] = "t";
      this.contador++;
    }
    if(this.contador==3){
      this.enviar();
    }
  }

  ponerZorro(){
    if(this.contador<3){
      this.Colores[this.contador] ="vale-yellow";
      this.dibujos[this.contador] ="../../assets/images/animales/zorro.png";
      this.Animales[this.contador] = "z";
      this.contador++;
    }
    if(this.contador==3){
      this.enviar();
    }
  }

  borrarColores(){
    this.Colores[0] ="white";
    this.Colores[1] ="white";
    this.Colores[2] ="white";
    this.dibujos[0] ="../../assets/images/transparent.png";
    this.dibujos[1] ="../../assets/images/transparent.png";
    this.dibujos[2] ="../../assets/images/transparent.png";
    this.contador=0;
  }

  async alertError(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
      duration: 200
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
