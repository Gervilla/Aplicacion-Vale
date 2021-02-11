import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniadirfacilitadorPage } from './aniadirfacilitador.page';

const routes: Routes = [
  {
    path: '',
    component: AniadirfacilitadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniadirfacilitadorPageRoutingModule {}
