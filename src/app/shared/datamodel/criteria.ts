export class Criteria {
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
