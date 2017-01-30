export class Criteria {
   public static from(json: any[]): Criteria[] {
      let criteria = [];
      for (let elem of json) {
         criteria.push(new Criteria(elem.text, elem.score));
      }
      return criteria;
   }

   public text: string;
   public score: number;

   constructor(text: string, score = 1) {
      this.text = text;
      this.score = score;
   }

   public clear(): void {
      this.score = 1;
   }
}
