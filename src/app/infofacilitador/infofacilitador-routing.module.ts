import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfofacilitadorPage } from './infofacilitador.page';

const routes: Routes = [
  {
    path: '',
    component: InfofacilitadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfofacilitadorPageRoutingModule {}
