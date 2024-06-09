import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(1) ] ],
    email: ['', [ Validators.required, Validators.minLength(1), Validators.email ] ],
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

  constructor(private service:ServiceService, private activeRoute: ActivatedRoute, private router: Router, private fb: FormBuilder){}

  user!: Usuario;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({id}) => {
      this.service.getUserById(id).subscribe(response => this.user = response)
    })
  }

  update(id: string){
    const body: Usuario = {
      name: this.myForm.controls['name'].value,
      email: this.myForm.controls['email'].value,
      password: this.user.password,
      isAdmin: this.user.isAdmin,
    };
    console.log(body);
    
    this.service.update(id, body)
      .subscribe(res => {
        console.log(res);
      });
      this.router.navigateByUrl('/socios/');
  }

}
