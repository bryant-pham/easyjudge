import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdDialog } from '@angular/material';

import { ADMIN_ROUTES } from './admin.routes';
import { AdminComponent } from './admin.component';
import { AdminEventsComponent } from './events/adminevents.component';
import { CreateEventDialog } from './events/createevent/createevent.dialog';

@NgModule({
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forChild(ADMIN_ROUTES),
      MaterialModule.forRoot()
   ],
   exports: [],
   declarations: [
      AdminComponent,
      AdminEventsComponent,
      CreateEventDialog
   ],
   providers: [
      MdDialog
   ],
   entryComponents: [ CreateEventDialog ]
})
export class AdminModule {}
