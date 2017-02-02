import { Criteria } from './criteria';

export class ScoreSheet {
   public static from(json: any): ScoreSheet {
      return new ScoreSheet(json.eventId, json.criteria,
         json.userId, json.projectNumber, json.id);
   }

   public static arrayFrom(json: any[]): ScoreSheet[] {
      let scores = [];
      for (let elem of json) {
         let score = new ScoreSheet(elem.eventId, elem.criteria,
            elem.userId, elem.projectNumber, elem.id);
         scores.push(score);
      }
      return scores;
   }

   public id: string;
   public eventId: string;
   public criteria: Criteria[];
   public userId: string;
   public projectNumber: string;

   constructor(eventId: string, criteria: Criteria[],
               userId: string, projectNumber?: string, id?: string) {
      this.eventId = eventId;
      this.criteria = criteria;
      this.userId = userId;
      this.projectNumber = projectNumber;
      this.id = id;
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
