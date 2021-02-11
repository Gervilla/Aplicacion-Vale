import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionfacilitadoresPage } from './gestionfacilitadores.page';

const routes: Routes = [
  {
    path: '',
    component: GestionfacilitadoresPage
  },
  {
    path: 'aniadirfacilitador',
    loadChildren: () => import('./aniadirfacilitador/aniadirfacilitador.module').then( m => m.AniadirfacilitadorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionfacilitadoresPageRoutingModule {}
