import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { EventService } from '../../shared/service/event.service';
import { AbstractComponent } from '../../shared/component/abstract.component';
import { Event } from '../../shared/datamodel/event';
import { EventDialog } from './eventdialog/event.dialog';

@Component({
   selector: 'events',
   templateUrl: './event.html',
   styleUrls: ['./event.css']
})
export class EventComponent extends AbstractComponent implements OnInit {
   public events: Event[] = [];

   constructor(private eventService: EventService,
               private dialog: MdDialog) {
      super();
   }

   public ngOnInit(): void {
      this.eventService.getEvents()
         .subscribe((events: Event[]) => this.events = events);
   }

   public openCreateDialog(): void {
      let dialogRef = this.dialog.open(EventDialog, {disableClose: true});
      let component = dialogRef.componentInstance;
      component.event = Event.createEmpty();
      component.addCriteria();
      component.title = 'Create an event';
   }

   public openEditDialog(event: Event): void {
      let dialogRef = this.dialog.open(EventDialog, {disableClose: true});
      let component = dialogRef.componentInstance;
      component.event = event;
      component.title = 'Edit event';
   }
}
