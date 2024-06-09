import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'ejercicios', loadChildren: () => import('./ejercicios/ejercicios.module').then(m => m.EjerciciosModule)},
  {path: 'monitores', loadChildren: () => import('./monitores/monitores.module').then(m => m.MonitoresModule)},
  {path: 'informacion', loadChildren: () => import('./informacion/informacion.module').then(m => m.InformacionModule)},
  {path: 'actividades', loadChildren: () => import('./actividades/actividades.module').then(m => m.ActividadesModule)},
  {path: 'socios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  {path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)},
  {path: '**', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
