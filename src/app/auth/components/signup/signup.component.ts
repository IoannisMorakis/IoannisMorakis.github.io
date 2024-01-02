import { Component } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
import {
  addDoc,
  setDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []

  constructor(public auth: Auth, public firestore: Firestore, private router: Router){
    this.getData();

  }

  Login(){
    this.router.navigate(['/auth/login']);
    //window.location.href='#/auth/login';
  }


  handleRegister(value: any){
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
     .then((response: any)=>{
        console.log(response.user)
     })
     .catch((err) =>{
      alert(err.message);
     });
     this.addData(value);
  }

  addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    const dbInstance = doc(this.firestore, 'users', value.email);
    if(value.password == value.confirmpassword){
      if(value.role=='Invetigador'||value.role=='Cliente'){
        setDoc(dbInstance, {
          'email': value.email,
          'role': value.role,
          'password': value.password
        })
          .then(() => {
            alert('Data Sent')
          })
          .catch((err) => {
            alert(err.message)
          })
      }else{alert('Rol no reconocido');}
     }else {
      alert('Claves No Iguales');
    }
  }

  getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }

  Salir(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.router.navigate(['auth/select']);
    //window.location.href='#/auth/login';
  }

}
