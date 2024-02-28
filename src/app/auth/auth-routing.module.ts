import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from './components/select/select.component';

const routes: Routes = [
  {
    path:'auth', component: AuthComponent, children:[
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path:'select', component: SelectComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
