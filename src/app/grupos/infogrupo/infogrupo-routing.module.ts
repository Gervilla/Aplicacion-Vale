import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfogrupoPage } from './infogrupo.page';

const routes: Routes = [
  {
    path: '',
    component: InfogrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfogrupoPageRoutingModule {}
