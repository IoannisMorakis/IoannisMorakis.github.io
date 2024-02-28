import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

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

    this.router.navigate(['client/projects']);
    //window.location.href='#/auth/login';
  }

  Projectos(){

    this.router.navigate(['client/projects']);
    //window.location.href='#/auth/login';
  }

  Perfil(){

    this.router.navigate(['client/perfil-edit']);
    //window.location.href='#/auth/login';
  }
  Muestras(){

    this.router.navigate(['client/muestras-all']);
    //window.location.href='#/auth/login';
  }


  Unidad(){

    this.router.navigate(['client/unidad-produccion-all']);
    //window.location.href='#/auth/login';
  }


}
