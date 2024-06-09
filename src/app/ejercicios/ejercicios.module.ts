import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { ListaGruposMuscularesComponent } from './lista-grupos-musculares/lista-grupos-musculares.component';
import { ListaPorGrupoComponent } from './lista-por-grupo/lista-por-grupo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './detalle/detalle.component';
import { NuevoComponent } from './nuevo/nuevo.component';


@NgModule({
  declarations: [
    ListaGruposMuscularesComponent,
    ListaPorGrupoComponent,
    DetalleComponent,
    NuevoComponent
  ],
  imports: [
    CommonModule,
    EjerciciosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EjerciciosModule { }
