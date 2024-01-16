import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { MuestrasComponent } from './component/muestras/muestras.component';
import { MuestrasAllComponent } from './component/muestras-all/muestras-all.component';
import { UnidadProduccionAllComponent } from './component/unidad-produccion-all/unidad-produccion-all.component';
import { UnidadProduccionInfoComponent } from './component/unidad-produccion-info/unidad-produccion-info.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { PerfilEditComponent } from './component/perfil-edit/perfil-edit.component';

const routes: Routes = [
  {
    path:'client', component: ClientComponent, children:[
    {path: 'projects', component: ProjectsComponent},
    {path: 'muestras-all', component: MuestrasAllComponent},
    {path: 'muestras/:id', component: MuestrasComponent},
    {path: 'unidad-produccion-all', component: UnidadProduccionAllComponent},
    {path: 'muestras-info/:id', component: MuestrasComponent},
    {path: 'unidad-produccion-info/:id', component: UnidadProduccionInfoComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'perfil-edit', component: PerfilEditComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

//unidad-produccion-info
