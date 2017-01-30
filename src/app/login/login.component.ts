import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/service/user.service';
import { User } from '../shared/datamodel/user';
import { AbstractComponent } from '../shared/component/abstract.component';
import { Admin } from '../shared/datamodel/admin';

@Component({
   selector: 'login',
   styleUrls: ['./login.css'],
   templateUrl: './login.html'
})
export class LoginComponent extends AbstractComponent implements OnInit {
   public username: string;
   public password: string;
   public isAdminLoginMode = false;

   constructor(private userService: UserService, private router: Router) {
      super();
   }

   public ngOnInit(): void {
      this.subs.push(this.userService.getCurrentUser()
         .subscribe((user: User) => {
            if (user) {
               this.router.navigate(['/score']);
            }
         }));
      this.subs.push(this.userService.getCurrentAdmin()
         .subscribe((admin: Admin) => {
            this.router.navigate(['/admin'])
         }));
   }

   public login(): void {
      this.userService.login(this.username);
   }

   public adminLogin(): void {
      this.userService.adminLogin(this.username, this.password);
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
}
