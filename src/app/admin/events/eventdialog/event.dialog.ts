import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { EventService } from '../../../shared/service/event.service';
import { Event } from '../../../shared/datamodel/event';
import { Criteria } from '../../../shared/datamodel/criteria';

@Component({
   selector: 'event-dialog',
   templateUrl: './eventdialog.html'
})
export class EventDialog {
   public event: Event;
   public title: string;

   constructor(private dialogRef: MdDialogRef<EventDialog>,
               private eventService: EventService) {}

   public close(): void {
      this.dialogRef.close();
   }

   public save(): void {
      this.eventService.create(this.event);
      this.dialogRef.close();
   }

   public addCriteria(): void {
      this.event.criteria.push(Criteria.createEmpty());
   }
}
