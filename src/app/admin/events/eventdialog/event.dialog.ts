import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

import { EventService } from '../../../shared/service/event.service';
import { Event } from '../../../shared/datamodel/event';
import { Criteria } from '../../../shared/datamodel/criteria';

@Component({
   selector: 'event-dialog',
   templateUrl: './eventdialog.html',
   styleUrls: ['../../../shared/component/validationstyles.css']
})
export class EventDialogComponent implements AfterViewChecked{
   public event: Event;
   public title: string;
   public form: NgForm;

   @ViewChild('form')
   public currentForm: NgForm;

   private validationMessages = {
      'name': {
         'required': 'Name is required.'
      },
      'criteria0': {
         'required': 'Criteria text is required.'
      }
   };

   private formErrors = {
      'name': '',
      'criteria0': ''
   };

   constructor(private dialogRef: MdDialogRef<EventDialogComponent>,
               private eventService: EventService) {}

   public ngAfterViewChecked(): void {
      this.formChanged();
   }

   public save(): void {
      this.eventService.save(this.event);
      this.dialogRef.close();
   }

   public addCriteria(): void {
      this.event.criteria.push(Criteria.createEmpty());
      this.addCriteriaValidation(this.event.criteria.length - 1);
   }

   public deleteCriteriaAtIndex(index: number): void {
      if (this.event.criteria.length > 1) {
         this.event.criteria.splice(index, 1);
         this.deleteCriteriaAtIndex(index);
      }
   }

   public formChanged(): void {
      if (this.currentForm === this.form) { return; }
      this.form = this.currentForm;
      if (this.form) {
         this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));
      }
   }

   public onValueChanged(data?: any): void {
      if (!this.form) { return; }
      const form = this.form.form;

      for (const field in this.formErrors) {
         // clear previous error message (if any)
         this.formErrors[field] = '';
         const control = form.get(field);

         if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
               this.formErrors[field] += messages[key] + ' ';
            }
         }
      }
   }

   public getErrorForCriteria(index: number): string {
      return this.formErrors[`criteria${index}`];
   }

   private addCriteriaValidation(index: number): void {
      this.formErrors[`criteria${index}`] = '';
      this.validationMessages[`criteria${index}`] = {
         'required': 'Criteria text is required.'
      };
   }

   private deleteCriteriaValidation(index: number): void {
      this.formErrors[`criteria${index}`] = undefined;
      this.validationMessages[`criteria${index}`] = undefined;
   }
}
