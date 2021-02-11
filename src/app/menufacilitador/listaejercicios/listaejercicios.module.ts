import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaejerciciosPageRoutingModule } from './listaejercicios-routing.module';

import { ListaejerciciosPage } from './listaejercicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaejerciciosPageRoutingModule
  ],
  declarations: [ListaejerciciosPage]
})
export class ListaejerciciosPageModule {}
