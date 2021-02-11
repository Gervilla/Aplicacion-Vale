import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenufacilitadorPage } from './menufacilitador.page';

const routes: Routes = [
  {
    path: '',
    component: MenufacilitadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenufacilitadorPageRoutingModule {}
