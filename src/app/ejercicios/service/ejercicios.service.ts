import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from '../interfaces/ejercicio.interface';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private http: HttpClient) { }

  private endpoint_ejercicios: string = 'http://localhost:3000/ejercicios/all';
  private endpoint_ejercicios_by_id: string = 'http://localhost:3000/ejercicios';
  private endpoint_by_name: string = 'http://localhost:3000/ejercicios/name';
  private endpoint_musculo: string = 'http://localhost:3000/ejercicios/muscle';
  private endpoint_create: string = 'http://localhost:3000/ejercicios';

  getAllEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.endpoint_ejercicios);
  }

  getAllEjerciciosByMuscle(muscle: string): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(`${this.endpoint_musculo}/${muscle}`);
  }

  getEjerciciosByName(name:string): Observable<Ejercicio[]>{  
    return this.http.get<Ejercicio[]>(`${this.endpoint_by_name}/${name}`);
  }

  getEjerciciosById(id:string): Observable<Ejercicio>{  
    return this.http.get<Ejercicio>(`${this.endpoint_ejercicios_by_id}/${id}`);
  }

  update(id: string, body: Ejercicio){
    return this.http.patch<Ejercicio>(`${this.endpoint_ejercicios_by_id}/${id}`, body);
  }

  create(body: Ejercicio){
    return this.http.post<Ejercicio>(this.endpoint_create, body)
  }

}
