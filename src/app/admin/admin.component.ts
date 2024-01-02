import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public data: any = []
  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {
    this.getData()
  }

  ngOnInit(): void {
    //console.log(history.state.user);
    //console.log(this.router);
    //console.log(this.route);
    /*this.route.params.subscribe(param =>{
      console.log(param);
    })*/


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

  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'users', id);
    updateDoc(dataToUpdate, {})
      .then(() => {
        alert('Data updated');
        this.getData()
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'users', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
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

    this.router.navigate(['admin']);
    //window.location.href='#/auth/login';
  }

  Projectos(){

    this.router.navigate(['admin']);
    //window.location.href='#/auth/login';
  }
  Muestras(){

    this.router.navigate(['admin']);
    //window.location.href='#/auth/login';
  }

}
