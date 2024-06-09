import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user_logged: string = localStorage.getItem('email') ?? ''
  inicioSesion! : boolean;

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(value => {
      this.inicioSesion = value;
      console.log(this.inicioSesion);
    });
  }

  logOut() {
    localStorage.setItem('email', '')
    this.router.navigate(['auth/']);
    this.authService.logOut();
  }

}
