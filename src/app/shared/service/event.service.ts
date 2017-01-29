import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UriGenerator } from './urigenerator';
import { HttpService } from './http.service';
import { AbstractService } from './abstract.service';
import { Event } from '../datamodel/event';
import { Actions } from '../reducer/actions';

@Injectable()
export class EventService extends AbstractService {
   constructor(private store: Store<any>,
               private uriGenerator: UriGenerator,
               private http: HttpService) {
      super();
   }

   public load(): void {
      let uri = this.uriGenerator.event();
      this.http.get(uri)
         .map((json) => new Event(json.name))
         .map((event) => this.createAction(Actions.SET_EVENT, event))
         .subscribe((action) => this.store.dispatch(action));
   }

   public getEvent(): Observable<Event> {
      return this.store.select('event')
         .skipWhile((event) => !event);
   }
}
