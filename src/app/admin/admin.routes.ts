import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminEventsComponent } from './events/adminevents.component';

export const ADMIN_ROUTES: Routes = [
   {
      path: 'admin',
      component: AdminComponent,
      children: [
         {
            path: '',
            redirectTo: 'events',
            pathMatch: 'full'
         },
         {
            path: 'events',
            component: AdminEventsComponent
         }
      ]
   }
];
