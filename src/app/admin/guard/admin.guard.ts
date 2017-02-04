import { Injectable } from '@angular/core';
import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../shared/service/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {
   constructor(private authService: AuthenticationService,
               private router: Router) {}

   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isAdminLoggedIn()
         .switchMap((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
               this.router.navigate(['/login']);
            }
            return Observable.of(isLoggedIn);
         });
   }
}
