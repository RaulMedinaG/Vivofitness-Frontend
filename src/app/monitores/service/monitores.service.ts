import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monitor } from '../interfaces/monitor.interface';

@Injectable({
  providedIn: 'root'
})
export class MonitoresService {

  constructor(private http: HttpClient) { }

  private endpoint_monitores: string = 'http://localhost:3000/monitor';

  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.endpoint_monitores);
  }
}
