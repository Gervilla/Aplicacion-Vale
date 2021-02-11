import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniadirpersonaPageRoutingModule } from './aniadirpersona-routing.module';

import { AniadirpersonaPage } from './aniadirpersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AniadirpersonaPageRoutingModule
  ],
  declarations: [AniadirpersonaPage]
})
export class AniadirpersonaPageModule {}
