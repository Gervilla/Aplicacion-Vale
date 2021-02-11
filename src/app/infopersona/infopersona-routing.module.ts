import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfopersonaPage } from './infopersona.page';

const routes: Routes = [
  {
    path: '',
    component: InfopersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfopersonaPageRoutingModule {}
