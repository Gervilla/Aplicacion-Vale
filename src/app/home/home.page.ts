import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage: StorageService, private router: Router) {}

  ionViewWillEnter(){
    this.storage.getUsuarioActivo().then(value =>{
      if(value){
        switch(value.tipo){
          case "persona": this.router.navigateByUrl('/menupersona'); break;
          case "facilitador": this.router.navigateByUrl('/menufacilitador'); break;
          case "administrador": this.router.navigateByUrl('/menuadministrador'); break;
        }
      }
    })
  }

}
