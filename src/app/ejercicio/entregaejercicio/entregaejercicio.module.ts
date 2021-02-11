import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregaejercicioPageRoutingModule } from './entregaejercicio-routing.module';

import { EntregaejercicioPage } from './entregaejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregaejercicioPageRoutingModule
  ],
  declarations: [EntregaejercicioPage]
})
export class EntregaejercicioPageModule {}
