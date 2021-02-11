import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoentregaPageRoutingModule } from './infoentrega-routing.module';

import { InfoentregaPage } from './infoentrega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoentregaPageRoutingModule
  ],
  declarations: [InfoentregaPage]
})
export class InfoentregaPageModule {}
