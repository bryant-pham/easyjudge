import { Action } from '@ngrx/store';

import { Admin } from '../datamodel/admin';
import { Actions } from './actions';

export function admin(state: Admin, action: Action): Admin {
   switch (action.type) {
      case Actions.SET_ADMIN:
         return action.payload;
      default:
         return state;
   }
}
