import { Action } from '@ngrx/store';

import { Event } from '../datamodel/event';
import { Actions } from './actions';

export function event(state = new Map<string, Event>(), action: Action): Map<string, Event> {
   switch (action.type) {
      case Actions.SET_EVENTS:
         action.payload.forEach((event: Event) => {
            state.set(event.id, event);
         });
         return new Map(state);
      case Actions.ADD_UPDATE_EVENT:
         let event: Event = action.payload;
         state.set(event.id, event);
         return new Map(state);
      default:
         return state;
   }
}
