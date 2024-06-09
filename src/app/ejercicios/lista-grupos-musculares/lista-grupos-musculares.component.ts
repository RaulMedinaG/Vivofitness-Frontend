import { Component } from '@angular/core';
import { EjerciciosService } from '../service/ejercicios.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-lista-grupos-musculares',
  templateUrl: './lista-grupos-musculares.component.html',
  styleUrl: './lista-grupos-musculares.component.css'
})
export class ListaGruposMuscularesComponent {

  grupos_musculares: string[] = [];
  user_logged: string = localStorage.getItem('email') ?? ''
  inicioSesion! : boolean;

  constructor(private service:EjerciciosService, private activeRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    this.getGruposMusculares();
    this.authService.isLoggedIn.subscribe(value => {
      this.inicioSesion = value;
      console.log(this.inicioSesion);
    });
  }

  getGruposMusculares(){
    this.service.getAllEjercicios().subscribe(response => {
      response.forEach(ejercicio => {
        if (!this.grupos_musculares.includes(ejercicio.muscle)) {
          this.grupos_musculares.push(ejercicio.muscle)
        }
      });
      console.log(this.grupos_musculares);
      
    })
  }


}
