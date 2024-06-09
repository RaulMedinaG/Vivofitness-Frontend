import { Component } from '@angular/core';
import { Monitor } from '../interfaces/monitor.interface';
import { MonitoresService } from '../service/monitores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  monitores: Monitor[] = []

  constructor(private service: MonitoresService) { }

  ngOnInit(): void {
    this.getGruposMusculares();
  }

  getGruposMusculares() {
    this.service.getMonitores().subscribe(response => {
      this.monitores = response;
      console.log(this.monitores);
    })
  }

}
