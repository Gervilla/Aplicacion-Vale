import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniadirpersonaPage } from './aniadirpersona.page';

const routes: Routes = [
  {
    path: '',
    component: AniadirpersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniadirpersonaPageRoutingModule {}
