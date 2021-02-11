import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfopersonaPageRoutingModule } from './infopersona-routing.module';

import { InfopersonaPage } from './infopersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfopersonaPageRoutingModule
  ],
  declarations: [InfopersonaPage]
})
export class InfopersonaPageModule {}
