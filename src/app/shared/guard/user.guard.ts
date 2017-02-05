import { Injectable } from '@angular/core';
import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class UserGuard implements CanActivate {
   constructor(private authService: AuthenticationService,
               private router: Router) {}

   public canActivate(route: ActivatedRouteSnapshot,
                      state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isUserLoggedIn()
         .switchMap((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
               this.router.navigate(['/login']);
            }
            return Observable.of(isLoggedIn);
         });
   }
}
