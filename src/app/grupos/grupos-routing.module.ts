import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposPage } from './grupos.page';

const routes: Routes = [
  {
    path: '',
    component: GruposPage
  },
  {
    path: 'infogrupo',
    loadChildren: () => import('./infogrupo/infogrupo.module').then( m => m.InfogrupoPageModule)
  },
  {
    path: 'creargrupo',
    loadChildren: () => import('./creargrupo/creargrupo.module').then( m => m.CreargrupoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposPageRoutingModule {}
