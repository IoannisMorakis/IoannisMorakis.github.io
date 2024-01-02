import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './component/projects/projects.component';
import { MuestrasComponent } from './component/muestras/muestras.component';
import { AppRoutingModule } from '../app-routing.module';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { MuestrasAllComponent } from './component/muestras-all/muestras-all.component';
import { MuestrasInfoComponent } from './component/muestras-info/muestras-info.component';
import { UnidadProduccionAllComponent } from './component/unidad-produccion-all/unidad-produccion-all.component';
import { UnidadProduccionInfoComponent } from './component/unidad-produccion-info/unidad-produccion-info.component';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res))

@NgModule({
  declarations: [
    ClientComponent,
    ProjectsComponent,
    MuestrasComponent,
    MuestrasAllComponent,
    MuestrasInfoComponent,
    UnidadProduccionAllComponent,
    UnidadProduccionInfoComponent
  ],
  imports: [
    ClientRoutingModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxScannerQrcodeModule,
    RouterModule
  ]
})
export class ClientModule { }
