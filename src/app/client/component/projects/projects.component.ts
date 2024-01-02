import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  public data: any = [];
  public list: any = [];
  public email: string ="";

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {
    this.getData();

    this.MyQuery();
  }

  getData() {
    //
    const gauth = getAuth();
    //console.log(gauth);
    onAuthStateChanged(gauth, (user) => {
      if (user) {
        //console.log(user.email);

        if(user.email){this.email= user.email;}
      }
    });
    //

    const dbInstance = collection(this.firestore, 'projects');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })


  }


  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'projects', id);
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
    const dataToDelete = doc(this.firestore, 'projects', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  newProject(){
    this.router.navigate(['user/project-new']);
    //window.location.href='#/auth/login';
  }

  EditProject(){
    this.router.navigate(['user/project-new']);
    //window.location.href='#/auth/login';
  }

  Muestras(id: any){
    this.router.navigate(['client/muestras/'+ id]);
    //window.location.href='#/auth/login';
  }

  editProyecto(id: any){
    this.router.navigate(['user/project-edit/'+ id]);
    //window.location.href='#/auth/login';
  }

  Scan(){

    this.router.navigate(['user/scan']);
    //window.location.href='#/auth/login';
  }

  Home(){

    this.router.navigate(['user/projects']);
    //window.location.href='#/auth/login';
  }


  logOut(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.router.navigate(['auth/select']);
    //window.location.href='#/auth/login';
  }


  //
  async MyQuery(){
    const gauth = getAuth();
    let temail: string;
    temail="";
    console.log(gauth);
    onAuthStateChanged(gauth, async (user) => {
      if (user) {
        console.log(user.email);
        if(user.email){
          temail =user.email;

          //console.log(temail);
          //email="giorgosmorakis@hotmail.com";
          //console.log(temail == "giorgosmorakis@hotmail.com");

          const q = query(collection(this.firestore, "projects"), where("cliente", "==", temail));

          getDocs(q)
          .then((response) => {
            this.data = [...response.docs.map((item) => {
              return { ...item.data(), id: item.id }

            })]

          });



          // /*
          const querySnapshot = await getDocs(q)
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log("here2");
            //this.list= doc;
            //this.data=doc;
          });
          console.log(this.data.length);
          console.log(this.data);
          console.log(this.data[0].cliente);
          // */


        }



      }

    });

    //console.log(this.data);
    //console.log("done");
    //

  }
  //

}
