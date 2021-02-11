import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuadministradorPageRoutingModule } from './menuadministrador-routing.module';

import { MenuadministradorPage } from './menuadministrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuadministradorPageRoutingModule
  ],
  declarations: [MenuadministradorPage]
})
export class MenuadministradorPageModule {}
