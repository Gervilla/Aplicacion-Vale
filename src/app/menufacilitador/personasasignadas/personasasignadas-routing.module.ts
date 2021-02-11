import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonasAsignadasPage } from './personasasignadas.page';

const routes: Routes = [
  {
    path: '',
    component: PersonasAsignadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasAsignadasPageRoutingModule {}
