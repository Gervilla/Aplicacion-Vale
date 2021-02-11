import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfogrupoPageRoutingModule } from './infogrupo-routing.module';

import { InfogrupoPage } from './infogrupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfogrupoPageRoutingModule
  ],
  declarations: [InfogrupoPage]
})
export class InfogrupoPageModule {}
