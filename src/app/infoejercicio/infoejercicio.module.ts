import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoejercicioPageRoutingModule } from './infoejercicio-routing.module';

import { InfoejercicioPage } from './infoejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoejercicioPageRoutingModule
  ],
  declarations: [InfoejercicioPage]
})
export class InfoejercicioPageModule {}
