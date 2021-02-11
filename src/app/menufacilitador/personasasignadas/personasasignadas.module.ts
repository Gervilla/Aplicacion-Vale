import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasAsignadasPageRoutingModule } from './personasasignadas-routing.module';

import { PersonasAsignadasPage } from './personasasignadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasAsignadasPageRoutingModule
  ],
  declarations: [PersonasAsignadasPage]
})
export class PersonasAsignadasPageModule {}
