import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: LocalStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = this.storageService.get('currentUser');

    if (currentUser && currentUser.role && currentUser.role.length && route.data && route.data.role && route.data.role.length) {
      let isValid = false;
      if (currentUser.role == route.data.role) {
        isValid = true
      }

      if (!isValid) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      //logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
