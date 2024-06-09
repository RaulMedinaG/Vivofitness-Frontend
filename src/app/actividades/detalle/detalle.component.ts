import { ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActividadService } from '../service/actividad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../interfaces/actividad.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  actividad!: Actividad;

  tiempo: number = 0;
  intervalo: any;
  contador_repeticiones: number = 0;
  contador_intervalo: any;

  user_in_actividad: boolean = false;
  user_logged: string = localStorage.getItem('userId') ?? ''
  inicioSesion! : boolean;

  constructor(private service: ActividadService, private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef, private location: Location, private authService:AuthService) { }

  ngOnInit(): void {
    this.getActividadById();
    this.authService.isLoggedIn.subscribe(value => {
      this.inicioSesion = value;
      console.log(this.inicioSesion);
    });
  }

  ngOnDestroy() {
    this.clearTimer();
    this.clearCountInterval();
  }

  getActividadById() {
    this.activeRoute.params.subscribe(({ id }) => {
      this.service.getActividadById(id).subscribe(response => {
        this.actividad = response;
        console.log(this.actividad);
        this.userInActividad();
      })
    });
  }

  userInActividad(){
    if (this.actividad.registered.includes(this.user_logged)) {
      this.user_in_actividad = true;
    } else if (this.actividad.waiting_list.includes(this.user_logged)) {
      this.user_in_actividad = true;
    } else this.user_in_actividad = false;
    console.log(this.user_in_actividad);
  }

  registerInActividad(){

    if (this.inicioSesion == false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Para realizar esta acción necesitas iniciar sesión!",
      });
    } else {
      this.actividad.registered.push(this.user_logged)
      const body: Actividad = {
        name: this.actividad.name,
        description: this.actividad.description,
        hourhand: this.actividad.hourhand,
        image: this.actividad.image,
        participants: this.actividad.participants,
        registered: this.actividad.registered,
        waiting_list: this.actividad.waiting_list,
      }
      console.log(body);
      this.service.registerInActividad(this.actividad._id!, body)
        .subscribe(res => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "De acuerdo!",
            text: "Te has registrado correctamente en la actividad",
          }).then((result) => {
            if (result.isConfirmed) {
              this.location.go(this.location.path());
              window.location.reload();
            }
          });
        });
    }
  }

  registerInWaitingList(){
    this.actividad.waiting_list.push(this.user_logged)
    const body: Actividad = {
      name: this.actividad.name,
      description: this.actividad.description,
      hourhand: this.actividad.hourhand,
      image: this.actividad.image,
      participants: this.actividad.participants,
      registered: this.actividad.registered,
      waiting_list: this.actividad.waiting_list,
    }
    console.log(body);
    this.service.registerInWaitingList(this.actividad._id!, body)
      .subscribe(res => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "De acuerdo!",
          text: "Estas en la lista de espera de esta actividad",
        }).then((result) => {
          if (result.isConfirmed) {
            this.location.go(this.location.path());
            window.location.reload();
          }
        });
      });
  }

  startTimer() {
    this.clearTimer();
    this.clearCountInterval();
    this.intervalo = setInterval(() => {
      this.tiempo++;
      this.cdr.detectChanges();
      if (this.tiempo >= 90) {
        this.contador_repeticiones++;
        this.stopTimer();
      }
    }, 1000); 
    this.contador_intervalo = setInterval(() => {
      if (this.contador_repeticiones < 30) {
        this.contador_repeticiones++;
        this.cdr.detectChanges();
      } else {
        this.stopTimer();
      }
    }, 3000); 
  }

  stopTimer() {
    this.clearTimer();
    this.clearCountInterval();
  }

  resetTimer() {
    this.clearTimer();
    this.clearCountInterval();
    this.tiempo = 0;
    this.contador_repeticiones = 0;
    this.cdr.detectChanges();
  }

  clearTimer() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  clearCountInterval() {
    if (this.contador_repeticiones) {
      clearInterval(this.contador_intervalo);
      this.contador_intervalo = null;
    }
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

}
