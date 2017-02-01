import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { EventService } from '../../shared/service/event.service';
import { AbstractComponent } from '../../shared/component/abstract.component';
import { Event } from '../../shared/datamodel/event';
import { CreateEventDialog } from './createevent/createevent.dialog';

@Component({
   selector: 'admin-events',
   templateUrl: './adminevents.html',
   styleUrls: ['./adminevents.css']
})
export class AdminEventsComponent extends AbstractComponent implements OnInit {
   public events: Event[] = [];
   private config: MdDialogConfig = {
      disableClose: false,
      width: '800px',
      height: '600px',
      position: {
         top: '',
         bottom: '',
         left: '',
         right: ''
      }
   };

   constructor(private eventService: EventService,
               private dialog: MdDialog) {
      super();
   }

   public ngOnInit(): void {
      this.eventService.getEvents()
         .subscribe((events: Event[]) => this.events = events);
   }

   public openDialog(): void {
      this.dialog.open(CreateEventDialog);
   }
}
