import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenufacilitadorPageRoutingModule } from './menufacilitador-routing.module';

import { MenufacilitadorPage } from './menufacilitador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenufacilitadorPageRoutingModule
  ],
  declarations: [MenufacilitadorPage]
})
export class MenufacilitadorPageModule {}
