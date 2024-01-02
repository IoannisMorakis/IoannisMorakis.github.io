import { Component } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public data: any = []
  public current: any
  public nid: number = 1;
  constructor(public auth: Auth, private router: Router,public firestore: Firestore){
    this.getData();
  }


  getData() {
    //console.log(this.auth.currentUser)
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }

  Signup(){
    this.router.navigate(['/auth/signup']);
    //window.location.href='#/auth/login';
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



  async handleLogin(value:any){
    let res;
    signInWithEmailAndPassword(this.auth, value.email, value.password)
    .then(async (response: any)=>{
      //console.log(response.user)
      //console.log(response.user.email)
      this.current=response.user.email;
      res=response.user.email;
      //console.log(res)
      const q = query(collection(this.firestore, "users"), where("email", "==", res));
      console.log(this.auth.currentUser?.email);


      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let info=doc.data();
        console.log(info['role']);

        if(info['role']=="Adminitrador"){
          this.router.navigate(['/admin']);
        }else if(info['role']=="Investigador"){
          this.router.navigate(['/user/projects']);
        }
        else if(info['role']=="Cliente"){
          this.router.navigate(['/client/projects']);
        }
        else{
          ;
        }


      });



    })
    .catch((err) =>{
     alert(err.message);
    })
    /*console.log(this.current);
    console.log("here");
    console.log(res);*/

    /*const q = query(collection(this.firestore, "user"), where("email", "==",this.current));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });*/


    //this.router.navigate(['/admin']);


    /*
    if(response.user.role=='Adminitrador'){
      this.router.navigate(['/admin']);
    }else if(response.user.role=='Investigador'){
      this.router.navigate(['/user/projects']);
    }
    else{this.router.navigate(['/client']);}*/





    //console.log(this.auth.currentUser)

    /*this.router.navigate(['/admin'],
    {
      state: {
        email: mail
      }
    }
    );*/
    //window.location.href= "#/admin";


  }

}


/*

  FirebaseAuth mFirebaseAuth = FirebaseAuth.getInstance();
  FirebaseUser mFirebaseUser = mFirebaseAuth.getCurrentUser();
  // User Name
  mFirebaseUser.getDisplayName();
  // User ID
  mFirebaseUser.getUid();
  // Email-ID
  mFirebaseUser.getEmail();
  // User-Profile (if available)
  mFirebaseUser.getPhotoUrl();



  this.current= this.auth.currentUser
  let str: string
  str= '#/admin/' + this.current
  window.location.href=str;


*/
