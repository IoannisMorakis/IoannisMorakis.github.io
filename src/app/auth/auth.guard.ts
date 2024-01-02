import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate{
  constructor( private auth: Auth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    let user= this.auth.currentUser
    if (user) { return true; }

    this.router.navigate(['/']);
    return false;
  }
}

