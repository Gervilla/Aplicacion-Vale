import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoejercicioPage } from './infoejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: InfoejercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoejercicioPageRoutingModule {}
