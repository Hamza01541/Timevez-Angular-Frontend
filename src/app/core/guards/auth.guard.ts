import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services';
import { Constants } from 'src/app/shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: LocalStorageService,
  ) { }

  /**
       *@param route will check if any data is passed in Parameter while moving to the route
       * It will match the Role from storage and data passed through param and navigate to role based module or page
       * Other wise it will return to login page
       */
  canActivate(route: ActivatedRouteSnapshot) {
    let currentUser = this.storageService.get(Constants.currentUser);

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
  }
}
