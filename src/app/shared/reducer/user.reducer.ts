import { Action } from '@ngrx/store';

import { User } from '../datamodel/user';
import { Actions } from './actions';

export function user(state: User, action: Action): User {
   switch (action.type) {
      case Actions.SET_USER:
         return action.payload;
      default:
         return state;
   }
}
