import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreargrupoPageRoutingModule } from './creargrupo-routing.module';

import { CreargrupoPage } from './creargrupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreargrupoPageRoutingModule
  ],
  declarations: [CreargrupoPage]
})
export class CreargrupoPageModule {}
