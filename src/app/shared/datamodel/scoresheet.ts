import { Criteria } from './criteria';

export class ScoreSheet {
   public static from(json: any): ScoreSheet {
      return new ScoreSheet(json.eventId, json.criteria,
         json.judgeName, json.projectNumber, json.id);
   }

   public id: string;
   public eventId: string;
   public criteria: Criteria[];
   public judgeName: string;
   public projectNumber: string;

   constructor(eventId: string, criteria: Criteria[],
               judgeName: string, projectNumber?: string, id?: string) {
      this.eventId = eventId;
      this.criteria = criteria;
      this.judgeName = judgeName;
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
