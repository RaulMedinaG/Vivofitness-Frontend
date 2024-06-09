import { Component } from '@angular/core';
import { Actividad } from '../interfaces/actividad.interface';
import { ActividadService } from '../service/actividad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  actividades: Actividad[] = [];
  mitad = 0;
  actividadesParte1: Actividad[] = [];
  actividadesParte2: Actividad[] = [];
  user_logged: string = localStorage.getItem('userId') ?? ''

  constructor(private service: ActividadService) { }

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades() {
    this.service.getActividades().subscribe(response => {
      this.actividades = response;
      this.mitad = Math.ceil(this.actividades.length / 2);
      this.actividadesParte1 = this.actividades.slice(0, this.mitad);
      this.actividadesParte2 = this.actividades.slice(this.mitad);
      console.log(this.actividades);
    })
  }

}
