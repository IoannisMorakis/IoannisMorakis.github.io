import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-muestras',
  templateUrl: './muestras.component.html',
  styleUrls: ['./muestras.component.css']
})
export class MuestrasComponent {

  public data: any = [];

  public item: any;
  public pid: any;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {
    //this.getData();
    this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.item=param['id'];

      console.log(param);
      console.log(param['id']);
      //this.generateBarcode(param);

    })
    //this.getData();
    this.MyQuery();

  }

  getData() {
    //console.log(this.auth.currentUser)
    const dbInstance = collection(this.firestore, 'muestras');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }


  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'muestras', id);
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
    const dataToDelete = doc(this.firestore, 'muestras', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  Scan(){

    this.router.navigate(['user/scan']);
    //window.location.href='#/auth/login';
  }

  Home(){

    this.router.navigate(['client/projects']);
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

  newMuestra(){
    this.router.navigate(['user/muestras-new']);
    //window.location.href='#/auth/login';
  }

  editMuestra(id: any){
    this.router.navigate(['user/muestras-edit/'+ id]);
    //window.location.href='#/auth/login';
  }

  infoProject(id: any){
    this.router.navigate(['user/project-edit/'+ id]);
    //window.location.href='#/auth/login';
  }

  infoMuestra(id: any){
    this.router.navigate(['client/muestras-info/'+ id]);
    //window.location.href='#/auth/login';
  }



  async MyQuery(){
    //let str="Project 10";
    let str=this.item;
    this.pid=str;
    console.log(str);
    const q = query(collection(this.firestore, "muestras"), where("project", "==",str));


    getDocs(q)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }

        })]

        //console.log(this.data.length);
        /*if(this.data.length==0){
          //alert(err.message);
          console.log("empty");

        };*/
      })





    /*const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

    });*/


    const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //console.log("here2");
        //this.list= doc;
        //this.data=doc;
      });
      //console.log("done");


  }

}
