import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniadirfacilitadorPageRoutingModule } from './aniadirfacilitador-routing.module';

import { AniadirfacilitadorPage } from './aniadirfacilitador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AniadirfacilitadorPageRoutingModule
  ],
  declarations: [AniadirfacilitadorPage]
})
export class AniadirfacilitadorPageModule {}
