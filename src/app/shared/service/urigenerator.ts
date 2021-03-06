import { Injectable } from '@angular/core';

const SCORE = 'score';
const LOGIN = 'login';
const ADMIN_LOGIN = 'login/admin';
const EVENT = 'event';
const EVENT_ID = 'event/:?';
const ACTIVE_EVENT = 'event/active';

@Injectable()
export class UriGenerator {
   private root: string;

   constructor(scheme: string, host: string, port: string, context: string) {
      this.root = `${scheme}://${host}:${port}/${context}`;
   }

   public score(): string {
      return this.generate(SCORE);
   }

   public scoreWithQueryParams(eventId?: string, userId?: string): string {
      let paramMap = new Map<string, string>();
      if (eventId) {
         paramMap.set('eventId', eventId);
      }
      if (userId) {
         paramMap.set('userId', userId);
      }
      return this.appendQueryParams(this.generate(SCORE), paramMap);
   }

   public login(): string {
      return this.generate(LOGIN);
   }

   public adminLogin(): string {
      return this.generate(ADMIN_LOGIN);
   }

   public event(): string {
      return this.generate(EVENT);
   }

   public activeEvent(): string {
      return this.generate(ACTIVE_EVENT);
   }

   public eventWithId(eventId: string): string {
      return this.generate(EVENT_ID, eventId);
   }

   public generate(path: string, ...args: string[]): string {
      for (let arg of args) {
         path = path.replace(/:\?/, arg);
      }
      return `${this.root}/${path}`;
   }

   public appendQueryParams(path: string, queryParams: Map<string, string>): string {
      let queryParamString = '';
      let isFirstIteration = true;
      queryParams.forEach((value, key) => {
         let keyValuePair;
         if (isFirstIteration) {
            keyValuePair = `${key}=${value}`;
            isFirstIteration = false;
         } else {
            keyValuePair = `&${key}=${value}`;
         }
         queryParamString = `${queryParamString}${keyValuePair}`;
      });
      return `${path}?${queryParamString}`;
   }
}
