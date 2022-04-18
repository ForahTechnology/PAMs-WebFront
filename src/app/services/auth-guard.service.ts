import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  checkUserState() {
    let token = localStorage.getItem('authenticatedUser')
    if(token) {
      return true;
    }else{
      return false;
    }
  }

  canActivate(): boolean {
    if (!this.checkUserState()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
