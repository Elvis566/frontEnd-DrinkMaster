import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdperfilPage } from './edperfil.page';

const routes: Routes = [
  {
    path: '',
    component: EdperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdperfilPageRoutingModule {}
