import { Action } from '@ngrx/store';

export abstract class AbstractService {
   protected createAction(type: string, payload: any): Action {
      return {type, payload};
   }
}
