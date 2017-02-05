export class Criteria {
   public static from(json: any[]): Criteria[] {
      let criteria = [];
      for (let elem of json) {
         criteria.push(new Criteria(elem.text, elem.score));
      }
      return criteria;
   }

   public static createEmpty(): Criteria {
      return new Criteria(null);
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

   public clone(): Criteria {
      return new Criteria(this.text, this.score);
   }
}
