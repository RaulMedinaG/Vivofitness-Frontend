import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  private endpoint_usuarios: string = 'http://localhost:3000/auth';

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endpoint_usuarios);
  }

  getUserById(id:string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.endpoint_usuarios}/${id}`);
  }

  update(id: string, body: Usuario){
    return this.http.patch<Usuario>(`${this.endpoint_usuarios}/${id}`, body);
  }

  eliminarUsuario(id:string){
    return this.http.delete(`${this.endpoint_usuarios}/${id}`);
  }
}
