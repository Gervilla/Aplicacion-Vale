import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigofacilitadorPageRoutingModule } from './codigofacilitador-routing.module';

import { CodigofacilitadorPage } from './codigofacilitador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigofacilitadorPageRoutingModule
  ],
  declarations: [CodigofacilitadorPage]
})
export class CodigofacilitadorPageModule {}
