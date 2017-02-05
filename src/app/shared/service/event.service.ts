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
         .map((json) => Event.arrayFrom(json))
         .map((events) => this.createAction(Actions.SET_EVENTS, events))
         .subscribe((action) => this.store.dispatch(action));
   }

   public getEvents(): Observable<Event[]> {
      return this.store.select('event')
         .map((eventMap: Map<string, Event>) => {
            let events = [];
            eventMap.forEach((event) => events.push(event));
            return events;
         });
   }

   public getActiveEvent(): Observable<Event> {
      return this.getEvents()
         .map((events: Event[]) => events.find((event: Event) => event.active))
         .skipWhile((event: Event) => !event);
   }

   public save(event: Event): void {
      if (event.id) {
         this.update(event);
      } else {
         this.create(event);
      }
   }

   public create(event: Event): void {
      let uri = this.uriGenerator.event();
      this.http.post(uri, event)
         .map((json) => Event.from(json))
         .map((createdEvent) => this.createAction(Actions.ADD_UPDATE_EVENT, createdEvent))
         .subscribe((action) => this.store.dispatch(action));
   }

   public update(event: Event): void {
      let uri = this.uriGenerator.eventWithId(event.id);
      this.http.put(uri, event)
         .map((json) => Event.from(json))
         .map((createdEvent) => this.createAction(Actions.ADD_UPDATE_EVENT, createdEvent))
         .subscribe((action) => this.store.dispatch(action));
   }

   public delete(event: Event): void {
      let uri = this.uriGenerator.eventWithId(event.id);
      this.http.delete(uri)
         .subscribe(() => {
            let action = this.createAction(Actions.DELETE_EVENT, event.id);
            this.store.dispatch(action);
         });
   }

   public toggleActive(event: Event): void {
      let uri = this.uriGenerator.eventWithId(event.id);
      this.http.put(uri, event)
         .map((json) => Event.from(json))
         .subscribe((updatedEvent: Event) => {
            if (updatedEvent.isActivated()) {
               this.load();
            }
         });

   }
}
