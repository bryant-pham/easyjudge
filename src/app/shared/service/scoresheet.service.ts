import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Criteria } from '../datamodel/criteria';
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
   private criteria: Criteria[] = [];

   constructor(private http: HttpService,
               private uriGenerator: UriGenerator,
               private userService: UserService,
               private eventService: EventService) {
      super();
   }

   public load(): void {
      let uri = this.uriGenerator.criteria();
      this.http.get(uri)
         .subscribe((criterionResponse: Array<{text: string}>) => {
            this.criteria = [];
            for (let response of criterionResponse) {
               this.criteria.push(new Criteria(response.text));
            }
      });
   }

   public createNewScoreSheet(): Observable<ScoreSheet> {
      return this.userService.getCurrentUser()
         .switchMap((currentUser: User) => {
            return this.eventService.getEvent()
               .switchMap((event: Event) => {
                  let scoreSheet = new ScoreSheet(event.name, this.criteria, currentUser.username);
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
