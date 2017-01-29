import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { UriGenerator } from './urigenerator';
import { User } from '../datamodel/user';
import { Actions } from '../reducer/actions';
import { AbstractService } from './abstract.service';

@Injectable()
export class UserService extends AbstractService {
   constructor(private store: Store<any>,
               private http: HttpService,
               private uriGenerator: UriGenerator) {
      super();
   }

   public login(username: string, password?: string): void {
      let uri = this.uriGenerator.login();
      this.http.post(uri, new User(username, null, password))
         .map((json) => new User(json.username, json.isAdmin))
         .map((user) => this.createAction(Actions.SET_USER, user))
         .subscribe((action) => this.store.dispatch(action));
   }

   public getCurrentUser(): Observable<User> {
      return this.store.select('user')
         .skipWhile((user) => !user);
   }
}
