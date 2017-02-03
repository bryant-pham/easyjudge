import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { ScoreService } from '../shared/service/score.service';
import { ScoreSheet } from '../shared/datamodel/scoresheet';
import { mdSnackBarConfig } from '../shared/datamodel/snackbarconfig';

@Component({
   selector: 'score-sheet',
   templateUrl: './scoresheet.html',
   styleUrls: ['./scoresheet.css']
})
export class ScoreSheetComponent implements OnInit {
   public scoreSheet: ScoreSheet;
   public scoreForm: FormGroup;
   public formErrors = {
      projectNumber: ''
   };

   private validationMessages = {
      projectNumber: {
         required: 'Project number is required.',
         pattern: 'Project number must be numeric'
      }
   };

   constructor(private scoreSheetService: ScoreService,
               private formBuilder: FormBuilder,
               private snackBar: MdSnackBar) {}

   public ngOnInit(): void {
      this.scoreSheetService.createNewScoreSheet()
         .subscribe((scoreSheet: ScoreSheet) => {
            this.scoreSheet = scoreSheet;
            this.buildForm();
         });
   }

   public submitSheet(): void {
      this.scoreSheetService.submitScore(this.scoreSheet)
         .subscribe((success: boolean) => {
            if (success) {
               this.scoreSheet.clear();
               this.buildForm();
               this.snackBar.open('Score submitted successfully', null, mdSnackBarConfig);
            } else {
               this.snackBar.open('Error submitting score. Please try again',
                  null, mdSnackBarConfig);
            }
         });
   }

   private buildForm(): void {
      this.scoreForm = this.formBuilder.group(
         {
            projectNumber: [
               this.scoreSheet.projectNumber,
               [
                  Validators.required,
                  Validators.pattern(new RegExp(/^\d+/))
               ]
            ]
         }
      );
      this.scoreForm.valueChanges
         .subscribe((data) => this.onValueChanged(data));
      this.onValueChanged();
   }

   private onValueChanged(data?: any): void {
      const form = this.scoreForm;
      for (const field in this.formErrors) {
         if (field) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
               const messages = this.validationMessages[field];
               for (const key in control.errors) {
                  if (key) {
                     this.formErrors[field] += messages[key] + ' ';
                  }
               }
            }
         }
      }
      if (this.scoreForm.valid) {
         this.scoreSheet.projectNumber = this.scoreForm.value.projectNumber;
      }
   }
}
