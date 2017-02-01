import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/service/event.service';

@Component({
   templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
   public navLinks = [
      {link: '/admin/events', label: 'Events'}
   ];

   constructor(private eventService: EventService) {}

   ngOnInit(): void {
      this.eventService.load();
   }
}
