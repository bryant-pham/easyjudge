import { Action } from '@ngrx/store';

import { ScoreSheet } from '../datamodel/scoresheet';
import { Actions } from './actions';

export function scoresheets(state: ScoreSheet[] = [], action: Action): ScoreSheet[] {
   switch (action.type) {
      case Actions.ADD_SCORESHEET:
         return [ ...state, action.payload ];
      default:
         return state;
   }
}
