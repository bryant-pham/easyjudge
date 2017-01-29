/*
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ScoreSheetService } from './shared/service/scoresheet.service';
import { EventService } from './shared/service/event.service';
import { UserService } from './shared/service/user.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <main>
       <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
   constructor(scoreSheetService: ScoreSheetService,
               eventService: EventService,
               userService: UserService) {
      scoreSheetService.load();
      eventService.load();

      // TODO: temp code - remove this
      userService.login('john cena');
   }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
