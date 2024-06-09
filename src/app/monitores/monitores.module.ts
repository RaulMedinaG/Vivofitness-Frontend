import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoresRoutingModule } from './monitores-routing.module';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    MonitoresRoutingModule
  ]
})
export class MonitoresModule { }
