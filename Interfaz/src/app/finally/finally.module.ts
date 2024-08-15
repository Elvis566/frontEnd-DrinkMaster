import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinallyPageRoutingModule } from './finally-routing.module';

import { FinallyPage } from './finally.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinallyPageRoutingModule
  ],
  declarations: [FinallyPage]
})
export class FinallyPageModule {}
