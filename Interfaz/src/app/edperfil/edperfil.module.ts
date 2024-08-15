import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdperfilPageRoutingModule } from './edperfil-routing.module';

import { EdperfilPage } from './edperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdperfilPageRoutingModule
  ],
  declarations: [EdperfilPage]
})
export class EdperfilPageModule {}
