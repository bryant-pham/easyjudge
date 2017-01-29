import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class AbstractComponent implements OnDestroy {
   protected subs: Subscription[] = [];

   public ngOnDestroy(): void {
      this.subs.forEach((sub: Subscription) => sub.unsubscribe());
   }
}
