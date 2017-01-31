import { Injectable } from '@angular/core';

const SCORE = 'score';
const LOGIN = 'login';
const ADMIN_LOGIN = 'admin/login';
const EVENTS = 'events';

@Injectable()
export class UriGenerator {
   private root: string;

   constructor(root: {scheme: string, host: string, port: string, context: string}) {
      this.root = `${root.scheme}://${root.host}:${root.port}/${root.context}`;
   }

   public score(): string {
      return this.generate(SCORE);
   }

   public login(): string {
      return this.generate(LOGIN);
   }

   public adminLogin(): string {
      return this.generate(ADMIN_LOGIN);
   }

   public events(): string {
      return this.generate(EVENTS);
   }

   public generate(path: string, ...args: string[]): string {
      for (let arg of args) {
         path = path.replace(/:\?/, arg);
      }
      return `${this.root}/${path}`;
   }
}
