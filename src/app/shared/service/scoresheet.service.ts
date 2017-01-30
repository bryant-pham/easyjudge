import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ScoreSheet } from '../datamodel/scoresheet';
import { HttpService } from './http.service';
import { UriGenerator } from './urigenerator';
import { AbstractService } from './abstract.service';
import { UserService } from './user.service';
import { User } from '../datamodel/user';
import { EventService } from './event.service';
import { Event } from '../datamodel/event';

@Injectable()
export class ScoreSheetService extends AbstractService {
   constructor(private http: HttpService,
               private uriGenerator: UriGenerator,
               private userService: UserService,
               private eventService: EventService) {
      super();
   }

   public createNewScoreSheet(): Observable<ScoreSheet> {
      return this.userService.getCurrentUser()
         .switchMap((currentUser: User) => {
            return this.eventService.getActiveEvent()
               .switchMap((event: Event) => {
                  let scoreSheet = new ScoreSheet(event.id, event.criteria, currentUser.username);
                  return Observable.of(scoreSheet);
               });
         });
   }

   public submitSheet(sheet: ScoreSheet): Observable<boolean> {
      let uri = this.uriGenerator.score();
      return this.http.post(uri, sheet)
         .map(() => true)
         .catch(() => Observable.of(false));
   }
}
