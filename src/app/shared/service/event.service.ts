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
      let uri = this.uriGenerator.events();
      this.http.get(uri)
         .map((json) => Event.from(json))
         .map((events) => this.createAction(Actions.SET_EVENTS, events))
         .subscribe((action) => this.store.dispatch(action));
   }

   public getEvents(): Observable<Event[]> {
      return this.store.select('events')
         .skipWhile((events) => !events);
   }

   public getActiveEvent(): Observable<Event> {
      return this.getEvents()
         .map((events: Event[]) => events.find((event: Event) => event.isActive));
   }
}
