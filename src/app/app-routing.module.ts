import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { PrintComponent } from './print/print.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {path:'', redirectTo: 'auth/select', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path:'auth', component: AuthComponent},
  {path: 'user', component: UserComponent},
  {path: 'client', component: ClientComponent},
  {path: 'print/:id', component: PrintComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
