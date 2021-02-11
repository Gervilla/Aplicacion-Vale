import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreargrupoPage } from './creargrupo.page';

const routes: Routes = [
  {
    path: '',
    component: CreargrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreargrupoPageRoutingModule {}
