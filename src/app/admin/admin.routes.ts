import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { EventComponent } from './events/event.component';
import { ViewScoresComponent } from './score/viewscores.component';

export const ADMIN_ROUTES: Routes = [
   {
      path: 'admin',
      component: AdminComponent,
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
