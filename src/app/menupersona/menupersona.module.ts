import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenupersonaPageRoutingModule } from './menupersona-routing.module';

import { MenupersonaPage } from './menupersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenupersonaPageRoutingModule
  ],
  declarations: [MenupersonaPage]
})
export class MenupersonaPageModule {}
