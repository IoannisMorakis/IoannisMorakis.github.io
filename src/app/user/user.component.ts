import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  title = 'gestion-muestras';

  constructor(public auth: Auth, private router: Router){

  }

  handleSignOut(){
    //const auth = getAuth();

    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log("here");
      // An error happened.
    });
    this.router.navigate(['auth/select']);

  }

  Home(){

    this.router.navigate(['user/projects']);
    //window.location.href='#/auth/login';
  }

  Projectos(){

    this.router.navigate(['user/projects']);
    //window.location.href='#/auth/login';
  }
  Muestras(){

    this.router.navigate(['user/muestras-all']);
    //window.location.href='#/auth/login';
  }

  Clientes(){
    this.router.navigate(['user/clients']);

  }

  Unidades(){
    this.router.navigate(['user/unidad-produccion-all']);

  }



}
