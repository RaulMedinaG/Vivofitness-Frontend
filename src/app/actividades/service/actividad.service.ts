import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../interfaces/actividad.interface';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http: HttpClient) { }

  private endpoint_actividades: string = 'http://localhost:3000/actividad';


  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.endpoint_actividades);
  }

  getActividadById(id: string): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.endpoint_actividades}/${id}`);
  }

  registerInActividad(id: string, body: Actividad) {
    return this.http.patch(`${this.endpoint_actividades}/${id}`, body)
  }

  registerInWaitingList(id: string, body: Actividad) {
    return this.http.patch(`${this.endpoint_actividades}/${id}`, body)
  }

}
