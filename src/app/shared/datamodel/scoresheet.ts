import { Criteria } from './criteria';

export class ScoreSheet {
   public eventName: string;
   public criteria: Criteria[];
   public judgeName: string;
   public projectNumber: string;

   constructor(eventName: string, criterion: Criteria[],
               judgeName: string, projectNumber?: string) {
      this.eventName = eventName;
      this.criteria = criterion;
      this.judgeName = judgeName;
      this.projectNumber = projectNumber;
   }

   public getScore(): number {
      let score = 0;
      for (let criteria of this.criteria) {
         score += criteria.score;
      }
      return score;
   }

   public clear(): void {
      this.projectNumber = null;
      this.criteria.forEach((criteria: Criteria) => criteria.clear());
   }
}
