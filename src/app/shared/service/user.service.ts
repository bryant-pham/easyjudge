import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Admin } from '../datamodel/admin';
import { AbstractService } from './abstract.service';
import { User } from '../datamodel/user';

@Injectable()
export class UserService extends AbstractService {
   constructor(private store: Store<any>) {
      super();
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
