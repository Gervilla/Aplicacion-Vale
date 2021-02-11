import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionfacilitadoresPageRoutingModule } from './gestionfacilitadores-routing.module';

import { GestionfacilitadoresPage } from './gestionfacilitadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionfacilitadoresPageRoutingModule
  ],
  declarations: [GestionfacilitadoresPage]
})
export class GestionfacilitadoresPageModule {}
