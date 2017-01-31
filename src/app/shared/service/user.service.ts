import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { UriGenerator } from './urigenerator';
import { Admin } from '../datamodel/admin';
import { Actions } from '../reducer/actions';
import { AbstractService } from './abstract.service';
import { User } from '../datamodel/user';

@Injectable()
export class UserService extends AbstractService {
   constructor(private store: Store<any>,
               private http: HttpService,
               private uriGenerator: UriGenerator) {
      super();
   }

   public login(username: string): void {
      let uri = this.uriGenerator.login();
      this.http.post(uri, new User(username))
         .map((json) => new User(json.username))
         .map((user) => this.createAction(Actions.SET_USER, user))
         .subscribe((action) => this.store.dispatch(action));
   }

   public adminLogin(username: string, password: string): void {
      let uri = this.uriGenerator.adminLogin();
      this.http.post(uri, new Admin(username, password))
         .map((json) => Admin.from(json))
         .map((user) => this.createAction(Actions.SET_USER, user))
         .subscribe((action) => this.store.dispatch(action));
   }

   public getCurrentUser(): Observable<User> {
      return this.store.select('user')
         .skipWhile((user) => !user);
   }

   public getCurrentAdmin(): Observable<Admin> {
      return this.store.select('admin')
         .skipWhile((admin) => !admin);
   }
}
