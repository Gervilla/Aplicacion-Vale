import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearejercicioPageRoutingModule } from './crearejercicio-routing.module';

import { CrearejercicioPage } from './crearejercicio.page';
import { PipesModule } from '../../pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearejercicioPageRoutingModule,
    PipesModule
  ],
  declarations: [CrearejercicioPage],
})
export class CrearejercicioPageModule {}
