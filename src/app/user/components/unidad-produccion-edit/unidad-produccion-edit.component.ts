import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidad-produccion-edit',
  templateUrl: './unidad-produccion-edit.component.html',
  styleUrls: ['./unidad-produccion-edit.component.css']
})
export class UnidadProduccionEditComponent {

  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public res: any = "";
  public item: any;
  public x: any;
  public pid: any;
  public static text: string = "";

  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore){
    //this.getData();
    //this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.x=param['id'];
      console.log(param);
      console.log(param['id']);
      //this.generateBarcode(param);

    })
    this.getData();
    this.MyQuery();

  }

  handleRegister(value: any){
    //console.log(value);
    this.addData(value);
  }

  async addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    console.log(value);
    const dbInstance = doc(this.firestore, 'unidad-produccion', value.codigo);

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
    const dbInstance = collection(this.firestore, 'unidad-produccion');
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
    //unidad-produccionNewComponent.lat= position.coords.latitude;
    //this.somethingChange.emit(position.coords.latitude);
    //console.log(position.coords.longitude);
    //this.something=position.coords.latitude;
    //this.somethingChange.emit(this.something);
    //var text = position.coords.latitude;
    //this.geo=text;
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    UnidadProduccionEditComponent.text = x+", "+ y;
    //console.log(unidad-produccionNewComponent.text);




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
      this.res= UnidadProduccionEditComponent.text;
      console.log(this.res);
      }
      ,1000);



  }


  async MyQuery(){
    let str=this.x;
    const q = query(collection(this.firestore, "unidad-produccion"), where("codigo", "==",str));

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
  }


  /*
    <div class="one" [innerHtml]="htmlToAdd"></div>
    this.htmlToAdd = '<div class="two">two</div>';
  */

  deleteData(id: string) {
    let str=this.x;
    const dataToDelete = doc(this.firestore, 'unidad-produccion', str);
    //console.log(id);
    //console.log(dataToDelete);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      //this.getData()
      this.router.navigate(['user/unidad-produccion/'+this.pid]);
    })
    .catch((err) => {
      alert(err.message)
    })

  }

}
