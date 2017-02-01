import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { EventService } from '../../../shared/service/event.service';
import { Event } from '../../../shared/datamodel/event';
import { Criteria } from '../../../shared/datamodel/criteria';

@Component({
   selector: 'create-event-dialog',
   templateUrl: './createevent.html'
})
export class CreateEventDialog implements OnInit {
   public event: Event;

   constructor(private dialogRef: MdDialogRef<CreateEventDialog>,
               private eventService: EventService) {}

   public ngOnInit(): void {
      this.event = Event.createEmpty();
      this.addCriteria();
   }

   public close(): void {
      this.dialogRef.close();
   }

   public save(): void {
      // no op
   }

   public addCriteria(): void {
      this.event.criteria.push(Criteria.createEmpty());
   }
}
