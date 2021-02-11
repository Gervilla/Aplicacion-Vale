import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfofacilitadorPageRoutingModule } from './infofacilitador-routing.module';

import { InfofacilitadorPage } from './infofacilitador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfofacilitadorPageRoutingModule
  ],
  declarations: [InfofacilitadorPage]
})
export class InfofacilitadorPageModule {}
