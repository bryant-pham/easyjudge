import { Criteria } from './criteria';

export class Event {
   public static from(json: any[]): Event[] {
      let events = [];
      for (let elem of json) {
         let event = new Event(elem.name, Criteria.from(elem.criteria),
            elem.organization, elem.active, elem.id);
         events.push(event);
      }
      return events;
   }

   public static createEmpty(): Event {
      return new Event(null, [], null, false);
   }

   public id: string;
   public name: string;
   public criteria: Criteria[];
   public organization: string;
   public active: boolean;

   constructor(name: string, criteria: Criteria[],
               organization: string, active: boolean, id?: string) {
      this.id = id;
      this.name = name;
      this.criteria = criteria;
      this.organization = organization;
      this.active = active;
   }
}
