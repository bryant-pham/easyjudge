import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { EventComponent } from './events/event.component';
import { ViewScoresComponent } from './score/viewscores.component';
import { AdminGuard } from './guard/admin.guard';

export const ADMIN_ROUTES: Routes = [
   {
      path: 'admin',
      component: AdminComponent,
      canActivate: [ AdminGuard ],
      children: [
         {
            path: '',
            redirectTo: 'event',
            pathMatch: 'full'
         },
         {
            path: 'event',
            component: EventComponent
         },
         {
            path: 'scores/:eventId',
            component: ViewScoresComponent
         }
      ]
   }
];
