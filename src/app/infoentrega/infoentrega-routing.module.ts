import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoentregaPage } from './infoentrega.page';

const routes: Routes = [
  {
    path: '',
    component: InfoentregaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoentregaPageRoutingModule {}
