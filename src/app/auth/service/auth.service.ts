import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogged } from '../interfaces/userlogged.interface';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  inicioSesion = new BehaviorSubject<boolean>(this.hasToken())
  private urlRegister: string = 'http://localhost:3000/auth/signup';
  private urlLogin: string = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  userLogged!: UserLogged;

  get getUser(){
    return {...this.userLogged};
  }

  get isLoggedIn() {
    return this.inicioSesion.asObservable();
  }

  login(email: string, password: string){

    const body = {
      email: email,
      password: password
    }; 

    return this.http.post<UserLogged>(this.urlLogin, body).pipe(
      tap(resp => {
        console.log(resp);
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('userId', resp.userId);
          localStorage.setItem('email', resp.email);
          this.userLogged = {
            token: resp.token,
            userId: resp.userId,
            email: resp.email
          };
        }
        this.inicioSesion.next(true);
        
      }),
      map(resp => resp !== null && resp !== undefined),
      catchError(err => of(false))
    );

  }

  register(usuario: string, email:string, password: string){

    const body = {
      name: usuario,
      email: email,
      password: password,
      isAdmin: false
    };

    
    return this.http.post<UserLogged>(this.urlRegister, body).pipe(
      tap(resp => {
        console.log(resp);
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('userId', resp.userId);
          localStorage.setItem('email', resp.email);
          this.userLogged = {
            token: resp.token,
            userId: resp.userId,
            email: resp.email
          };
        }
        this.inicioSesion.next(true);
        return of(this.inicioSesion);
      }),
      map(resp => resp !== null && resp !== undefined),
      catchError(err => of(false))
    );

  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    this.inicioSesion.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
