import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListafeedbackPage } from './listafeedback.page';

const routes: Routes = [
  {
    path: '',
    component: ListafeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListafeedbackPageRoutingModule {}
