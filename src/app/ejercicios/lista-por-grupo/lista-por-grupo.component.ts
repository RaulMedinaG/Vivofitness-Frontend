import { Component } from '@angular/core';
import { EjerciciosService } from '../service/ejercicios.service';
import { ActivatedRoute } from '@angular/router';
import { Ejercicio } from '../interfaces/ejercicio.interface';

@Component({
  selector: 'app-lista-por-grupo',
  templateUrl: './lista-por-grupo.component.html',
  styleUrl: './lista-por-grupo.component.css'
})
export class ListaPorGrupoComponent {

  ejercicios: Ejercicio[] = []
  busqueda: string = '';
  user_logged: string = localStorage.getItem('email') ?? ''

  constructor(private service: EjerciciosService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGruposMusculares()
  }

  getGruposMusculares() {
    this.activeRoute.params.subscribe(({ grupo }) => {
      this.service.getAllEjerciciosByMuscle(grupo).subscribe(response => {
        this.ejercicios = response;
        console.log(this.ejercicios);
      })
    })
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
    return text.substring(0, lastSpaceIndex) + '...';
  }

  buscarEjercicios() {

    if (this.busqueda == '') {
      this.getGruposMusculares();
    } else {
      this.service.getEjerciciosByName(this.busqueda).subscribe(response => {
        this.ejercicios = response;
        console.log(this.ejercicios);
      })
    }
  }

}
