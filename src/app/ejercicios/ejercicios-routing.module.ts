import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGruposMuscularesComponent } from './lista-grupos-musculares/lista-grupos-musculares.component';
import { ListaPorGrupoComponent } from './lista-por-grupo/lista-por-grupo.component';
import { DetalleComponent } from './detalle/detalle.component';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  {path: '', component: ListaGruposMuscularesComponent},
  {path: 'listaporgrupo/:grupo', component: ListaPorGrupoComponent},
  {path: 'ejercicio/:id', component: DetalleComponent},
  {path: 'añadir', component: NuevoComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
