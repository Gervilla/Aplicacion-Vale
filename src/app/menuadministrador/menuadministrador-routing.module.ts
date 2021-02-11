import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuadministradorPage } from './menuadministrador.page';

const routes: Routes = [
  {
    path: '',
    component: MenuadministradorPage
  },
  {
    path: 'gestionfacilitadores',
    loadChildren: () => import('./gestionfacilitadores/gestionfacilitadores.module').then( m => m.GestionfacilitadoresPageModule)
  },
  {
    path: 'aniadirfacilitador',
    loadChildren: () => import('./gestionfacilitadores/aniadirfacilitador/aniadirfacilitador.module').then( m => m.AniadirfacilitadorPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuadministradorPageRoutingModule {}
