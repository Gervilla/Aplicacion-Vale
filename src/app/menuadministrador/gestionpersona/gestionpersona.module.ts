import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionpersonaPageRoutingModule } from './gestionpersona-routing.module';

import { GestionpersonaPage } from './gestionpersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionpersonaPageRoutingModule
  ],
  declarations: [GestionpersonaPage]
})
export class GestionpersonaPageModule {}
