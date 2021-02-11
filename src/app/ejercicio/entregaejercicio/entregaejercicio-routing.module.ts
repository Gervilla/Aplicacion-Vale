import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregaejercicioPage } from './entregaejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: EntregaejercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregaejercicioPageRoutingModule {}
