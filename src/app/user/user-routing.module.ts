import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';
import { MuestrasNewComponent } from './components/muestras-new/muestras-new.component';
import { ScanComponent } from './components/scan/scan.component';
import { MuestrasEditComponent } from './components/muestras-edit/muestras-edit.component';
import { MuestrasInfoComponent } from './components/muestras-info/muestras-info.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { UnidadProduccionComponent } from './components/unidad-produccion/unidad-produccion.component';
import { UnidadProduccionNewComponent } from './components/unidad-produccion-new/unidad-produccion-new.component';
import { UnidadProduccionEditComponent } from './components/unidad-produccion-edit/unidad-produccion-edit.component';
import { UnidadProduccionInfoComponent } from './components/unidad-produccion-info/unidad-produccion-info.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsNewComponent } from './components/clients-new/clients-new.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from './components/clients-info/clients-info.component';


const routes: Routes = [
  {
    path:'user', component: UserComponent, children:[
    {path: 'projects', component: ProjectsComponent},
    {path: 'project-new', component: ProjectNewComponent},
    {path: 'project-edit/:id', component: ProjectEditComponent},
    {path: 'project-info/:id', component: ProjectInfoComponent},
    {path: 'barcode/:id', component:BarcodeComponent},
    {path: 'muestras/:id/:up', component:MuestrasComponent},
    {path: 'muestras-new/:id', component:MuestrasNewComponent},
    {path: 'muestras-edit/:id', component:MuestrasEditComponent},
    {path: 'muestras-info/:id', component:MuestrasInfoComponent},
    {path: 'muestras-all', component:MuestrasAllComponent},
    {path: 'unidad-produccion/:id', component:UnidadProduccionComponent},
    {path: 'unidad-produccion-new/:id', component:UnidadProduccionNewComponent},
    {path: 'unidad-produccion-edit/:id', component:UnidadProduccionEditComponent},
    {path: 'unidad-produccion-info/:id', component:UnidadProduccionInfoComponent},
    {path: 'unidad-produccion-all', component:UnidadProduccionAllComponent},
    {path:'clients', component:ClientsComponent},
    {path:'clients-new', component:ClientsNewComponent},
    {path:'clients-edit/:id', component:ClientsEditComponent},
    {path:'clients-info/:id', component:ClientsInfoComponent},
    {path: 'scan', component:ScanComponent}

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
