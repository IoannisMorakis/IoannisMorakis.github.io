import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public res: any = "";
  public item: any;
  public x: any;
  public pid: any;
  public static text: string = "";
  public email: string ="";


  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore){
    this.getData();
    this.MyQuery();
  }

  /*ngOnInit(): void {
    this.route.params.subscribe(param =>{
      //this.x=param['id'];
      //console.log(param);
      //console.log(param['id']);
      //this.generateBarcode(param);

    })

    this.getData();
    this.MyQuery();

  }*/

  handleRegister(value: any){
    //console.log(value);
    this.addData(value);
  }

  async addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    console.log(value);
    const dbInstance = doc(this.firestore, 'clientes', value.codigo);

    updateDoc(dbInstance,
      {
        codigo: value.codigo,
        cliente: value.cliente,
        fecha: value.fecha,
        cultivo: value.cultivo,
        tipo: value.tipo,
        fitopatogeno: value.fitopatogeno,
        estado: value.estado,
        coordenadas: value.coordenadas,
        sintomas: value.sintomas,
        comentarios: value.comentarios,
        project: this.pid
      }

      )
      .then(() => {

        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })
      console.log(this.pid)


  }

  getData() {


    const dbInstance = collection(this.firestore, 'clientes');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })

  }


  showPosition(position: any) {
    /*
      const p: HTMLParagraphElement = this.renderer.createElement('p');
      p.innerHTML = "add new"
      this.renderer.appendChild(this.div.nativeElement, p)
    */
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    //console.log(res);
    //MuestrasNewComponent.lat= position.coords.latitude;
    //this.somethingChange.emit(position.coords.latitude);
    //console.log(position.coords.longitude);
    //this.something=position.coords.latitude;
    //this.somethingChange.emit(this.something);
    //var text = position.coords.latitude;
    //this.geo=text;
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    PerfilEditComponent.text = x+", "+ y;
    //console.log(MuestrasNewComponent.text);




    //x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
  }

  async getLocation() {
    //d1.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    //console.log("click");
    var test = "...";
    this.res=test;
    //console.log(this.res);



    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.showPosition);



    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
      console.log("error");
    }
    setTimeout(() => {
      this.res= PerfilEditComponent.text;
      console.log(this.res);
      }
      ,1000);



  }


  async MyQuery(){

    /*
    let str=this.x;
    const q = query(collection(this.firestore, "clientes"), where("email", "==",str));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.item=doc.data();
        console.log(doc.id, " => ", doc.data());
        //
        this.res=this.item.coordenadas;
        this.pid=this.item.project;
      });
    }
    */

    //


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

          const q = query(collection(this.firestore, "clientes"), where("email", "==", temail));

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
            this.item=doc.data();
            this.pid=doc.id;
            console.log(doc.id, " => ", doc.data());
            console.log("here2");
            //this.list= doc;
            //this.data=doc;
          });
          console.log(this.data.length);
          console.log(this.data);
          console.log(this.data[0].email);
          // */


        }



      }

    });







  }


  /*
    <div class="one" [innerHtml]="htmlToAdd"></div>
    this.htmlToAdd = '<div class="two">two</div>';
  */

  deleteData(id: string) {
    let str=this.x;
    const dataToDelete = doc(this.firestore, 'clientes', str);
    //console.log(id);
    //console.log(dataToDelete);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      //this.getData()
      this.router.navigate(['user/muestras/'+this.pid]);
    })
    .catch((err) => {
      alert(err.message)
    })

  }

}
