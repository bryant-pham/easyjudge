import { Injectable } from '@angular/core';

const CRITERIA = 'criteria';
const SCORE = 'score';
const LOGIN = 'login';
const EVENT = 'event';

@Injectable()
export class UriGenerator {
   private root: string;

   constructor(root: {scheme: string, host: string, port: string, context: string}) {
      this.root = `${root.scheme}://${root.host}:${root.port}/${root.context}`;
   }

   public criteria(): string {
      return this.generate(CRITERIA);
   }

   public score(): string {
      return this.generate(SCORE);
   }

   public login(): string {
      return this.generate(LOGIN);
   }

   public event(): string {
      return this.generate(EVENT);
   }

   private generate(path: string): string {
      return `${this.root}/${path}`;
   }
}
