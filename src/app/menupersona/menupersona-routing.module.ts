import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenupersonaPage } from './menupersona.page';

const routes: Routes = [
  {
    path: '',
    component: MenupersonaPage
  },
  {
    path: 'fecha',
    loadChildren: () => import('./fecha/fecha.module').then( m => m.FechaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenupersonaPageRoutingModule {}
