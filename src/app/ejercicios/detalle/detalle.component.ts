import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EjerciciosService } from '../service/ejercicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ejercicio } from '../interfaces/ejercicio.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(1) ] ],
    description: ['', [ Validators.required, Validators.minLength(1), Validators.email ] ],
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

  constructor(private service:EjerciciosService, private activeRoute: ActivatedRoute, private router: Router, private fb: FormBuilder){}

  ejercicio!: Ejercicio;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({id}) => {
      this.service.getEjerciciosById(id).subscribe(response => this.ejercicio = response)
    })
  }

  update(id: string){
    const body: Ejercicio = {
      name: this.myForm.controls['name'].value,
      description: this.myForm.controls['description'].value,
      image: this.ejercicio.image,
      muscle: this.ejercicio.muscle
    };
    console.log(body);
    
    this.service.update(id, body)
      .subscribe(res => {
        console.log(res);
      });
      this.router.navigateByUrl(`/ejercicios/listaporgrupo/${this.ejercicio.muscle}`);
  }

}
