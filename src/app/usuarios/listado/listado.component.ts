import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { ServiceService } from '../service/service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  usuarios: Usuario[] = []

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUSuarios();
  }

  getUSuarios() {
    this.service.getUsuarios().subscribe(response => {
      this.usuarios = response;
      console.log(this.usuarios);
    })
  }

  eliminar(id: string){
    
    Swal.fire({
      title: "¿Quieres eliminar este socio?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Socio eliminado!", "", "success").then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        this.service.eliminarUsuario(id).subscribe(()=>{
          this.router.navigateByUrl('/socios')
        });
      } else if (result.isDenied) {
        Swal.fire("Socio no eliminado", "", "info");
      }
    });
  }

}
