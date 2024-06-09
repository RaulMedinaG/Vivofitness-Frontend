import { Component } from '@angular/core';
import { EjerciciosService } from '../service/ejercicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ejercicio } from '../interfaces/ejercicio.interface';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(1) ] ],
    description: ['', [ Validators.required, Validators.minLength(1) ] ],
    muscle: ['', [ Validators.required, Validators.minLength(1) ] ],
    image: ['', [ Validators.required, Validators.minLength(1) ] ],
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

  create() {
    const body: Ejercicio = {
      name: this.myForm.controls['name'].value,
      description: this.myForm.controls['description'].value,
      muscle: this.myForm.controls['muscle'].value,
      image: this.myForm.controls['image'].value,
    };
    console.log(body);

    this.service.create(body)
      .subscribe(res => console.log(res))
    this.router.navigateByUrl(`/ejercicios/listaporgrupo/${this.myForm.controls['muscle'].value}`);
  }

}
