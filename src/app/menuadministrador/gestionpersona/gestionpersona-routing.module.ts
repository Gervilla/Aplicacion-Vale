import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionpersonaPage } from './gestionpersona.page';

const routes: Routes = [
  {
    path: '',
    component: GestionpersonaPage
  },
  {
    path: 'aniadirpersona',
    loadChildren: () => import('./aniadirpersona/aniadirpersona.module').then( m => m.AniadirpersonaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionpersonaPageRoutingModule {}
