import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AbstractService } from './abstract.service';
import { UriGenerator } from './urigenerator';
import { HttpService } from './http.service';
import { User } from '../datamodel/user';
import { Actions } from '../reducer/actions';
import { Admin } from '../datamodel/admin';

@Injectable()
export class AuthenticationService extends AbstractService {
   constructor(private store: Store<any>,
               private http: HttpService,
               private uriGenerator: UriGenerator) {
      super();
   }

   public login(username: string): void {
      let uri = this.uriGenerator.login();
      this.http.post(uri, new User(username))
         .map((json) => new User(json.username, json.id))
         .map((user) => this.createAction(Actions.SET_USER, user))
         .subscribe((action) => this.store.dispatch(action));
   }

   public adminLogin(username: string, password: string): void {
      let uri = this.uriGenerator.adminLogin();
      this.http.post(uri, new Admin(username, password))
         .map((json) => Admin.from(json))
         .map((admin) => this.createAction(Actions.SET_ADMIN, admin))
         .subscribe((action) => this.store.dispatch(action));
   }

   public isUserLoggedIn(): Observable<boolean> {
      return this.store.select('user')
         .map((user: User) => user !== undefined);
   }

   public isAdminLoggedIn(): Observable<boolean> {
      return this.store.select('admin')
         .map((admin: Admin) => admin !== undefined);
   }
}
