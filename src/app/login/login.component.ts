import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/datamodel/user';
import { AbstractComponent } from '../shared/component/abstract.component';
import { Admin } from '../shared/datamodel/admin';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
   selector: 'login',
   styleUrls: ['./login.css'],
   templateUrl: './login.html'
})
export class LoginComponent extends AbstractComponent implements OnInit {
   public username: string;
   public password: string;
   public isAdminLoginMode = false;

   constructor(private authService: AuthenticationService, private router: Router) {
      super();
   }

   public ngOnInit(): void {
      this.subs.push(this.authService.isUserLoggedIn()
         .subscribe((isLoggedIn: boolean) => {
            if (isLoggedIn) {
               this.router.navigate(['/score']);
            }
         }));
      this.subs.push(this.authService.isAdminLoggedIn()
         .subscribe((isLoggedIn: boolean) => {
            if (isLoggedIn) {
               this.router.navigate(['/admin']);
            }
         }));
   }

   public login(): void {
      if (!this.isUndefinedOrEmpty(this.username)) {
         this.authService.login(this.username);
      }
   }

   public adminLogin(): void {
      if (!this.isUndefinedOrEmpty(this.username) && !this.isUndefinedOrEmpty(this.username)) {
         this.authService.adminLogin(this.username, this.password);
      }
   }

   public toggleLoginMode(): void {
      this.isAdminLoginMode = !this.isAdminLoginMode;
   }

   public loginModeText(): string {
      if (this.isAdminLoginMode) {
         return 'Log in as judge';
      }
      return 'Log in as admin ';
   }

   private isUndefinedOrEmpty(field: string): boolean {
      return !field || field === '';
   }
}
