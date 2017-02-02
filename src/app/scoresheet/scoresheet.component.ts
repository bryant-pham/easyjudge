import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { ScoreService } from '../shared/service/score.service';
import { ScoreSheet } from '../shared/datamodel/scoresheet';
import { mdSnackBarConfig } from '../shared/datamodel/snackbarconfig';

@Component({
   selector: 'score-sheet',
   templateUrl: './scoresheet.html'
})
export class ScoreSheetComponent implements OnInit {
   public scoreSheet: ScoreSheet;

   constructor(private scoreSheetService: ScoreService,
               private snackBar: MdSnackBar) {}

   public ngOnInit(): void {
      this.scoreSheetService.createNewScoreSheet()
         .subscribe((scoreSheet: ScoreSheet) => this.scoreSheet = scoreSheet);
   }

   public submitSheet(): void {
      this.scoreSheetService.submitScore(this.scoreSheet)
         .subscribe((success: boolean) => {
            if (success) {
               this.scoreSheet.clear();
               this.snackBar.open('Score submitted successfully', null, mdSnackBarConfig);
            } else {
               this.snackBar.open('Error submitting score. Please try again',
                  null, mdSnackBarConfig);
            }
         });
   }
}
