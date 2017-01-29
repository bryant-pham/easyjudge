import { Action } from '@ngrx/store';

import { Event } from '../datamodel/event';
import { Actions } from './actions';

export function eventReducer(state: Event, action: Action): Event {
   switch (action.type) {
      case Actions.SET_EVENT:
         return action.payload;
      default:
         return state;
   }
}
