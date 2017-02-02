import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ScoreSheet } from '../datamodel/scoresheet';
import { HttpService } from './http.service';
import { UriGenerator } from './urigenerator';
import { AbstractService } from './abstract.service';
import { UserService } from './user.service';
import { User } from '../datamodel/user';
import { EventService } from './event.service';
import { Event } from '../datamodel/event';
import { Actions } from '../reducer/actions';

@Injectable()
export class ScoreService extends AbstractService {
   constructor(private http: HttpService,
               private uriGenerator: UriGenerator,
               private userService: UserService,
               private eventService: EventService,
               private store: Store<any>) {
      super();
   }

   public createNewScoreSheet(): Observable<ScoreSheet> {
      return this.userService.getCurrentUser()
         .switchMap((currentUser: User) => {
            return this.eventService.getActiveEvent()
               .switchMap((event: Event) => {
                  let scoreSheet = new ScoreSheet(event.id, event.criteria, currentUser.id);
                  return Observable.of(scoreSheet);
               });
         });
   }

   public submitScore(scoreSheet: ScoreSheet): Observable<boolean> {
      let uri = this.uriGenerator.score();
      return this.http.post(uri, scoreSheet)
         .map((json) => {
            let action = this.createAction(Actions.ADD_SCORESHEET, ScoreSheet.from(json));
            this.store.dispatch(action);
            return true;
         })
         .catch(() => Observable.of(false));
   }

   public getScoresForEvent(eventId: string): Observable<ScoreSheet[]> {
      let uri = this.uriGenerator.scoreWithQueryParams(eventId);
      return this.http.get(uri)
         .map((json) => ScoreSheet.arrayFrom(json));
   }
}
