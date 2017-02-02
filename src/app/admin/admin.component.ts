import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/service/event.service';

@Component({
   templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
   public navLinks = [
      {link: '/admin/event', label: 'Events'}
   ];

   constructor(private eventService: EventService) {}

   public ngOnInit(): void {
      this.eventService.load();
   }
}
