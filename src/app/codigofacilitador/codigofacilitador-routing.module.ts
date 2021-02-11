import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigofacilitadorPage } from './codigofacilitador.page';

const routes: Routes = [
  {
    path: '',
    component: CodigofacilitadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigofacilitadorPageRoutingModule {}
