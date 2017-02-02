import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { ScoreService } from '../../shared/service/score.service';
import { AbstractComponent } from '../../shared/component/abstract.component';
import { ScoreSheet } from '../../shared/datamodel/scoresheet';

@Component({
   selector: 'view-scores',
   templateUrl: './viewscores.html'
})
export class ViewScoresComponent extends AbstractComponent implements OnInit {
   public scoreMap: Map<string, number> = new Map<string, number>();
   public scores: Array<{projectNumber: string, sumScore: number}> = [];

   constructor(private route: ActivatedRoute,
               private scoreService: ScoreService) {
      super();
   }

   public ngOnInit(): void {
      this.route.params
         .map((params: Params) => params['eventId'])
         .subscribe((eventId: string) => {
            this.scoreService.getScoresForEvent(eventId)
               .subscribe((scores: ScoreSheet[]) => this.sumScores(scores));
         });
   }

   private sumScores(scores: ScoreSheet[]): void {
      this.populateScoreMap(scores);
      this.scoreMap.forEach((sumScore, projectNumber) => {
         this.scores.push({projectNumber, sumScore});
      });
   }

   private populateScoreMap(scores: ScoreSheet[]): void {
      for (let score of scores) {
         if (!this.scoreMap.has(score.projectNumber)) {
            this.scoreMap.set(score.projectNumber, 0);
         }
         let sum = this.scoreMap.get(score.projectNumber);
         sum += score.getScore();
         this.scoreMap.set(score.projectNumber, sum);
      }
   }
}
