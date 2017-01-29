import { Component, OnInit } from '@angular/core';

import { ScoreSheetService } from '../shared/service/scoresheet.service';
import { ScoreSheet } from '../shared/datamodel/scoresheet';

@Component({
   selector: 'score-sheet',
   templateUrl: './scoresheet.html'
})
export class ScoreSheetComponent implements OnInit {
   public scoreSheet: ScoreSheet;

   constructor(private scoreSheetService: ScoreSheetService) {}

   public ngOnInit(): void {
      this.scoreSheetService.createNewScoreSheet()
         .subscribe((scoreSheet: ScoreSheet) => this.scoreSheet = scoreSheet);
   }

   public submitSheet(): void {
      this.scoreSheetService.submitSheet(this.scoreSheet)
         .subscribe((success: boolean) => {
            if (success) {
               this.scoreSheet.clear();
            } else {
               // error popup
            }
         });
   }
}
