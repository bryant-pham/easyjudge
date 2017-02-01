import { Action } from '@ngrx/store';

import { Event } from '../datamodel/event';
import { Actions } from './actions';

export function events(state: Event[] = [], action: Action): Event[] {
   switch (action.type) {
      case Actions.SET_EVENTS:
         return action.payload;
      case Actions.ADD_EVENT:
         return [ ...state, ...action.payload ];
      default:
         return state;
   }
}
