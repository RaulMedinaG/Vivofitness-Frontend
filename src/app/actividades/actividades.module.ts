import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { DetalleComponent } from './detalle/detalle.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListadoComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    SharedModule
  ]
})
export class ActividadesModule { }
